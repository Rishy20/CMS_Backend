//Database Name
const DBNAME = process.env.DB_NAME;
//Collection Name
const COLLECTION = 'Editors';
//Import the getClient method
const getClient = require("./connection");
//Import ObjectId
const {ObjectId} = require('mongodb');

let editors;

//Establish the connection
getClient().then(data=>{
    editors = data.db(DBNAME).collection(COLLECTION);
}).catch(err=>{
    console.error(err);
});

//Insert editor
const save = async (editor) => {
    const result = await editors.insertOne(editor);
    return result.insertedCount;
}
//GetAll editors
const getAll = async () =>{
    const cursor = await editors.find();
    return cursor.toArray();
}
//GetById editor
const getById = async (id) =>{
    return await editors.findOne({_id:ObjectId(id)});
}
//Delete editor
const removeById = async id =>{
    const result = await editors.deleteOne({_id:ObjectId(id)});
    return result.deletedCount;
}
//Update editor
const update = async (id, editor) =>{

    const result = await editors.replaceOne({_id:ObjectId(id)}, editor);
    return result.modifiedCount;
}
//Export the methods
module.exports = {
    save,
    getAll,
    getById,
    removeById,
    update
};