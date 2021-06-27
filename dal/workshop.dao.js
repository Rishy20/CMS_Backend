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
//Get approved workshops
const getApproved= async () =>{
    const cursor = await workshops.find({status:"approved"});
    return cursor.toArray();
}
//Get pending workshops
const getPending= async () =>{
    const cursor = await workshops.find({status:"pending"});
    return cursor.toArray();
}
//Get rejected workshops
const getRejected= async () =>{
    const cursor = await workshops.find({status:"rejected"});
    return cursor.toArray();
}
//Update Workshop Status
const updateStatus = async (id, reviewerId, status) =>{
    const result = await workshops.updateOne({_id:ObjectId(id)}, {$set:{status:status,reviewerId:ObjectId(reviewerId)}});
    return result.modifiedCount;
}
//Get approved workshops by Reviewer
const getApprovedByReviewer= async (id) =>{
    const cursor = await workshops.find({status:"approved",reviewerId: ObjectId(id)});
    return cursor.toArray();
}
//Get rejected workshops by Reviewer
const getRejectedByReviewer= async (id) =>{
    const cursor = await workshops.find({status:"rejected",reviewerId: ObjectId(id)});
    return cursor.toArray();
}
//Export the methods
module.exports = {
    getAll,
    getById,
    removeById,
    save,
    update,
    getApproved,
    getPending,
    getRejected,
    updateStatus,
    getApprovedByReviewer,
    getRejectedByReviewer
};