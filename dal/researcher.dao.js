//Database Name
const DBNAME = process.env.DB_NAME;
//Collection Name
const COLLECTION = 'Researchers';
//Import the getClient method
const getClient = require("./connection");
//Import ObjectId
const {ObjectId} = require('mongodb');

let researchers;

//Establish the connection
getClient().then(data=>{
    researchers = data.db(DBNAME).collection(COLLECTION);
}).catch(err=>{
    console.error(err);
});

//Save method
const save = async (researcher) => {
    const result = await researchers.insertOne(researcher);
    return result.insertedCount;
}
//GetAll method
const getAll = async () =>{
    const cursor = await researchers.find();
    return cursor.toArray();
}
//GetById method
const getById = async (id) =>{
    return await researchers.findOne({_id:ObjectId(id)});
}
//Delete method
const removeById = async id =>{
    const result = await researchers.deleteOne({_id:ObjectId(id)});
    return result.deletedCount;
}
//Update method
const update = async (id, researcher) =>{

    const result = await researchers.replaceOne({_id:ObjectId(id)}, researcher);
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