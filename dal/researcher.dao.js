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
    return result.insertedId;
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
//Get approved researchers
const getApproved= async () =>{
    const cursor = await researchers.find({status:"approved",paymentId: {$ne:null}});
    return cursor.toArray();
}
//Get pending researchers
const getPending= async () =>{
    const cursor = await researchers.find({status:"pending"});
    return cursor.toArray();
}
//Get rejected researchers
const getRejected= async () =>{
    const cursor = await researchers.find({status:"rejected"});
    return cursor.toArray();
}
//Delete method
const removeById = async id =>{
    const result = await researchers.deleteOne({_id:ObjectId(id)});
    return result.insertedId;
}
//Update method
const update = async (id, researcher) =>{
    const result = await researchers.replaceOne({_id:ObjectId(id)}, researcher);
    return result.modifiedCount;
}
//Update method
const updatePaymentId = async (id, paymentId) =>{
    const result = await researchers.updateOne({_id:ObjectId(id)}, {$set:{paymentId:paymentId}});
    return result.modifiedCount;
}
//Export the methods
module.exports = {
    getAll,
    getById,
    removeById,
    save,
    update,
    updatePaymentId,
    getPending,
    getApproved,
    getRejected
};