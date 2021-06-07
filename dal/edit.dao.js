//Database Name
const DBNAME = process.env.DB_NAME;
//Collection Name
const COLLECTION = 'Edits';
//Import the getClient method
const getClient = require("./connection");
//Import ObjectId
const {ObjectId} = require('mongodb');

let edits;

//Establish the connection
getClient().then(data=>{
    edits = data.db(DBNAME).collection(COLLECTION);
}).catch(err=>{
    console.error(err);
});

//Save method
const save = async (edit) => {
    const result = await edits.insertOne(edit);
    return result.insertedId;
}
//GetAll method
const getAll = async () =>{
    const cursor = await edits.find();
    return cursor.toArray();
}
//GetById method
const getById = async (id) =>{
    return await edits.findOne({_id:ObjectId(id)});
}
//Delete method
const removeById = async id =>{
    const result = await edits.deleteOne({_id:ObjectId(id)});
    return result.deletedCount;
}
//Update method
const update = async (id, edit) =>{
    const result = await edits.replaceOne({_id:ObjectId(id)}, edit);
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