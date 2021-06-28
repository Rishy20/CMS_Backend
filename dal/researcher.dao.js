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
    return result.deletedCount;
}
//Update method
const update = async (id, researcher) =>{
    const result = await researchers.replaceOne({_id:ObjectId(id)}, researcher);
    return result.modifiedCount;
}
//Update Payment method
const updatePaymentId = async (id, paymentId) =>{
    const result = await researchers.updateOne({_id:ObjectId(id)}, {$set:{paymentId:paymentId}});
    return result.modifiedCount;
}
//Update Paper Status
const updateStatus = async (id, reviewerId, status) =>{
    const result = await researchers.updateOne({_id:ObjectId(id)}, {$set:{status:status,reviewerId:ObjectId(reviewerId)}});
    return result.modifiedCount;
}
//Get approved researchers by Reviewer
const getApprovedByReviewer= async (id) =>{
    const cursor = await researchers.find({status:"approved",paymentId: {$ne:null},reviewerId: ObjectId(id)});
    return cursor.toArray();
}
//Get rejected researchers by Reviewer
const getRejectedByReviewer= async (id) =>{
    const cursor = await researchers.find({status:"rejected",reviewerId: ObjectId(id)});
    return cursor.toArray();
}
//Get approved researchers count
const getApprovedCount= async () =>{
    return await researchers.find({status:"approved",paymentId: {$ne:null}}).count();
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
    getRejected,
    updateStatus,
    getApprovedByReviewer,
    getRejectedByReviewer,
    getApprovedCount
};