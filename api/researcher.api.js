//Import the methods 
const {getAll, getById, removeById, save, update} = require('../dal/researcher.dao');

const {saveUser,updateUser,deleteLogin} = require("../dal/login.dao");
//Require bcrypt
const bcrypt = require('bcrypt');
//Map the save() method
const createResearcher = async ({fname,lname,contact,email,password,country,jobTitle,company,bio,img,paper}) => {

    //Encrypt the password
    password = await bcrypt.hash(password,5);
    //Create a researcher object
    const researcher = {
        fname,
        lname,
        email,
        contact,
        country,
        jobTitle,
        company,
        bio,
        img,
        paper
    }

    // Pass the Researcher object to save() method
    let researcherId =  await save(researcher);

    //Create a user object to save them in the Login collection
    const user = {
        _id:researcherId,
        email,
        password,
        userType:"researcher"
    }
    let id = await saveUser(user);
    if(id === 1){
        return {status:"Success"}
    }else{
        return {status:"Fail",msg:"Failed to create Login in the database"}
    }
}
//Map the getAll() method
const getResearchers = async ()=>{
    return await getAll();
}
//Map the getById() method
const getResearcher = async id =>{
    return await getById(id);
}
//Map the removeById() method
const deleteResearcher = async id =>{
    let result = await deleteLogin(id);
    if(result===1){
        return await removeById(id);
    }
    return {status:"Failed",message:"Delete Failed"}
}
//Map the update method
const updateResearcher = async (id,{fname,lname,contact,email,password,country,jobTitle,company,bio,img,paper})=>{
    //Create a researcher object
    const researcher = {
        fname,
        lname,
        email,
        contact,
        country,
        jobTitle,
        company,
        bio,
        img,
        paper
    }
    //Create a user object to update them in the Login collection
    const user = {
        email,
        password,
        userType:"researcher"
    }
    //Update the researcher in the db
    let result = await update(id,researcher);
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
    createResearcher,
    getResearchers,
    getResearcher,
    deleteResearcher,
    updateResearcher
}

