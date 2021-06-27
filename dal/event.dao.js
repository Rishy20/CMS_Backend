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
    const cursor = await events.find();
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
    save,
    update
};