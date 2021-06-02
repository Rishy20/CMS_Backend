//Database Name
const DBNAME = process.env.DB_NAME;
//Collection Name
const COLLECTION = 'Info';
//Import the getClient method
const getClient = require("./connection");
//Import ObjectId
const {ObjectId} = require('mongodb');

let info;

//Establish the connection
getClient().then(data=>{
    info = data.db(DBNAME).collection(COLLECTION);
}).catch(err=>{
    console.error(err);
});

//Save method
const save = async (info) => {
    const result = await info.insertOne(info);
    return result.insertedId;
}
//GetAll method
const getAll = async () =>{
    const cursor = await info.find();
    return cursor.toArray();
}
//GetById method
const getById = async (id) =>{
    return await info.findOne({_id:ObjectId(id)});
}
//Delete method
const removeById = async id =>{
    const result = await info.deleteOne({_id:ObjectId(id)});
    return result.insertedId;
}
//Update method
const update = async (id, info) =>{
    const result = await info.replaceOne({_id:ObjectId(id)}, info);
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