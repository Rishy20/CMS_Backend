//Database Name
const DBNAME = process.env.DB_NAME;
//Collection Name
const COLLECTION = 'Keynotes';
//Import the getClient method
const getClient = require("./connection");
//Import ObjectId
const {ObjectId} = require('mongodb');

let keynotes;

//Establish the connection
getClient().then(data=>{
    keynotes = data.db(DBNAME).collection(COLLECTION);
}).catch(err=>{
    console.error(err);
});

//Save method
const save = async (keynote) => {
    const result = await keynotes.insertOne(keynote);
    return result.insertedId;
}
//GetAll method
const getAll = async () =>{
    const cursor = await keynotes.find();
    return cursor.toArray();
}
//GetById method
const getById = async (id) =>{
    return await keynotes.findOne({_id:ObjectId(id)});
}
//Delete method
const removeById = async id =>{
    const result = await keynotes.deleteOne({_id:ObjectId(id)});
    return result.deletedCount;
}
//Update method
const update = async (id, keynote) =>{
    const result = await keynotes.replaceOne({_id:ObjectId(id)}, keynote);
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