//Database Name
const DBNAME = process.env.DB_NAME;
//Collection Name
const COLLECTION = 'Workshops';
//Import the getClient method
const getClient = require("./connection");
//Import ObjectId
const {ObjectId} = require('mongodb');

let workshops;

//Establish the connection
getClient().then(data=>{
    workshops = data.db(DBNAME).collection(COLLECTION);
}).catch(err=>{
    console.error(err);
});

//Save method
const save = async (workshop) => {
    const result = await workshops.insertOne(workshop);
    return result.insertedId;
}
//GetAll method
const getAll = async () =>{
    const cursor = await workshops.find();
    return cursor.toArray();
}
//GetById method
const getById = async (id) =>{
    return await workshops.findOne({_id:ObjectId(id)});
}
//Delete method
const removeById = async id =>{
    const result = await workshops.deleteOne({_id:ObjectId(id)});
    return result.deletedCount;
}
//Update method
const update = async (id, workshop) =>{
    const result = await workshops.replaceOne({_id:ObjectId(id)}, workshop);
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