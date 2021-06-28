//Database Name
const DBNAME = process.env.DB_NAME;
//Collection Name
const COLLECTION = 'Events';
//Import the getClient method
const getClient = require("./connection");
//Import ObjectId
const {ObjectId} = require('mongodb');

let events;

//Establish the connection
getClient().then(data=>{
    events = data.db(DBNAME).collection(COLLECTION);
}).catch(err=>{
    console.error(err);
});

//Save method
const save = async (event) => {
    const result = await events.insertOne(event);
    return result.insertedId;
}
//GetAll method
const getAll = async () =>{
    const cursor = await events.aggregate([
        {
          $lookup:{
              from:"Researchers",
              localField:"researcher",
              foreignField:"_id",
              as:"researcher"
          },

        },
        {
            $lookup:{
                from:"Workshops",
                localField:"workshop",
                foreignField:"_id",
                as:"workshop"
            }
        },
        {
            $sort:{date: 1}
        },
        {
            $sort: {time:1}
        }
    ]);
    return cursor.toArray();
}
const getByDay = async (day) => {
    const cursor = await events.aggregate([
        {
            $match:{
                dayNumber:day
            }
        },
        {
            $lookup:{
                from:"Researchers",
                localField:"researcher",
                foreignField:"_id",
                as:"researcher"
            },

        },
        {
            $lookup:{
                from:"Workshops",
                localField:"workshop",
                foreignField:"_id",
                as:"workshop"
            }
        },
        {
            $sort: {time:1}
        }
    ]);
    return cursor.toArray();
}
//GetById method
const getById = async (id) =>{
    return await events.findOne({_id:ObjectId(id)});
}
//Delete method
const removeById = async id =>{
    const result = await events.deleteOne({_id:ObjectId(id)});
    return result.deletedCount;
}
//Update method
const update = async (id, event) =>{
    const result = await events.replaceOne({_id:ObjectId(id)}, event);
    return result.modifiedCount;
}
//Export the methods
module.exports = {
    getAll,
    getById,
    removeById,
    getByDay,
    save,
    update
};