//Import the methods 
const {
    getAll,
    getById,
    removeById,
    save,
    update,
    getApproved,
    getRejected,
    getPending,
    updateStatus,
    getApprovedByReviewer,
    getRejectedByReviewer,
    getApprovedCount
} = require('../dal/workshop.dao');

const {saveUser,updateUser,deleteLogin,getUserById} = require("../dal/login.dao");

//Require bcrypt
const bcrypt = require('bcrypt');

const {createNotification} = require("./notification.api");
//Map the save() method
const createWorkshop = async ({workshopName, presentersName ,email,contact,password,country,jobTitle,company,avatar,proposal}) => {

    //Encrypt the password
    password = await bcrypt.hash(password,5);
    //Create a Workshop object
    const workshop = {
        workshopName,
        presentersName,
        email,
        contact,
        country,
        jobTitle,
        company,
        avatar,
        proposal,
        status:"pending",
        createdAt: new Date()
    }
    // Pass the workshop object to save() method
    let workshopId =  await save(workshop);

    //Create a user object to save them in the Login collection
    const user = {
        _id:workshopId,
        email,
        password,
        userType:"workshop"
    }
    let id = await saveUser(user);
    if(id === 1){
        return {status:"Success"}
    }else{
        return {status:"Fail",msg:"Failed to create Login in the database"}
    }
}
//Map the getAll() method
const getWorkshops = async ()=>{
    return await getAll();
}
//Map the getById() method
const getWorkshop = async id =>{
    return await getById(id);
}
//Map the getApproved() method
const getApprovedWorkshops = async ()=>{
    return await getApproved();
}
//Map the getPending() method
const getPendingWorkshops = async ()=>{
    return await getPending();
}
//Map the getRejected() method
const getRejectedWorkshops = async ()=>{
    return await getRejected();
}
//Map the removeById() method
const deleteWorkshop = async id =>{
    let result = await deleteLogin(id);
    if(result===1){
        return await removeById(id);
    }
    return {status:"Failed",message:"Delete Failed"}
}
const getApprovedWorkshopCount = async () => {
    return await getApprovedCount();
}
//Map the update method
const updateWorkshop = async (id,{workshopName, presentersName ,email,password,contact,country,jobTitle,company,avatar,proposal,createdAt})=>{
    //Create a Workshop object
    const workshop = {
        workshopName,
        presentersName,
        email,
        contact,
        country,
        jobTitle,
        company,
        avatar,
        proposal,
        createdAt
    }

    //Update the workshop in the db
    let result = await update(id,workshop);
    // Check whether a password is given or not
    if (password) {
        // Encrypt the new password
        password = await bcrypt.hash(password, 5);
    } else {
        // Use existing password if the password given is null
        await getUserById(id).then(data => password = data.password);
    }
    //Create a user object to update them in the Login collection
    const user = {
        email,
        password,
        userType:"workshop"

    }
    //Check if the update is successful
    if(result === 1){
        //Update the login credentials
        result = await updateUser(id,email);
        //Check if update is successful
        if(result === 1){
            return {status:"Success",msg:"User updated Successfully"}
        }
    }
    return {status:"Fail",msg:"User update Failed"}
}
const updateWorkshopStatus = async (id,{reviewerId,status}) => {

    if(status==="approved") {
        await createNotification({
            title: "Workshop Proposal approved",
            message: "Congratulations, your proposal got approved. " ,
            userId: id
        })
    }else if(status==="rejected"){
        await createNotification({
            title: "Workshop Proposal rejected",
            message: "Sorry, your proposal got rejected. " +
                "Please try again next year",
            userId: id
        })
    }
    return await updateStatus(id,reviewerId,status)
}
//Map the getApprovedByReviewer() method
const getApprovedWorkshopsByReviewer = async (id)=>{
    return await getApprovedByReviewer(id);
}
//Map the getRejectedByReviewer() method
const getRejectedWorkshopsByReviewer = async (id)=>{
    return await getRejectedByReviewer(id);
}
//Export the methods to be used in routes
module.exports = {
    createWorkshop,
    getWorkshops,
    getWorkshop,
    deleteWorkshop,
    updateWorkshop,
    getApprovedWorkshops,
    getPendingWorkshops,
    getRejectedWorkshops,
    updateWorkshopStatus,
    getRejectedWorkshopsByReviewer,
    getApprovedWorkshopsByReviewer,
    getApprovedWorkshopCount
}
