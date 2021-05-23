//Import the methods 
const {getAll, getById, removeById, save, update} = require('../dal/workshop.dao');

const {saveUser,updateUser,deleteLogin} = require("../dal/login.dao");

//Require bcrypt
const bcrypt = require('bcrypt');
//Map the save() method
const createWorkshop = async ({workshopName, presentersName ,email,contact,password,country,jobTitle,company,img,proposal}) => {

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
        img,
        proposal
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
//Map the removeById() method
const deleteWorkshop = async id =>{
    let result = deleteLogin(id);
    if(result===1){
        return await removeById(id);
    }
    return {status:"Failed",message:"Delete Failed"}
}
//Map the update method
const updateWorkshop = async (id,{workshopName, presentersName ,email,contact,password,country,jobTitle,company,img,proposal})=>{
    //Create a Workshop object
    const workshop = {
        workshopName,
        presentersName,
        email,
        contact,
        country,
        jobTitle,
        company,
        img,
        proposal
    }
    //Create a user object to update them in the Login collection
    const user = {
        _id:id,
        email,
        password,
        userType:"workshop"
    }
    //Update the workshop in the db
    let result = await update(id,workshop);
    //Check if the update is successful
    if(result === 1){
        //Update the login credentials
        result = await updateUser(id,user);
        //Check if update is successful
        if(result === 1){
            return {status:"Success",msg:"User updated Successfully"}
        }
    }
    return {status:"Fail",msg:"User update Failed"}
}
//Export the methods to be used in routes
module.exports = {
    createWorkshop,
    getWorkshops,
    getWorkshop,
    deleteWorkshop,
    updateWorkshop
}
