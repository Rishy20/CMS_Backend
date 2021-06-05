//Import the methods
const {getAll, getById, removeById, save, update} = require('../dal/reviewer.dao');
//Require bcrypt
const bcrypt = require('bcrypt');

const {saveUser,updateUser,deleteLogin,getUserById} = require("../dal/login.dao");

//Map the save() method
const createReviewer = async ({fname,lname,email,password,contact,country}) => {

    //Encrypt the password
    password = await bcrypt.hash(password,5);
    //Create a reviewer object
    const reviewer = {
        fname,
        lname,
        email,
        contact,
        country,
        createdAt: new Date()
    }
    // Pass the reviewer object to save() method
    let reviewerId =  await save(reviewer);

    //Create a user object to save them in the Login collection
    const user = {
        _id:reviewerId,
        email,
        password,
        userType:"reviewer"
    }
    let id = await saveUser(user);

    if(id === 1){
        return {status:"Success"}
    }else{
        return {status:"Fail",msg:"Failed to create Login in the database"}
    }
}
//Map the getAll() method
const getReviewers = async ()=>{
    return await getAll();
}
//Map the getById() method
const getReviewer = async id =>{
    return await getById(id);
}
//Map the removeById() method
const deleteReviewer = async id =>{
    let result = await deleteLogin(id);
    if(result===1){
        return await removeById(id);
    }
    return {status:"Failed",message:"Delete Failed"}
}
//Map the update method
const updateReviewer = async (id, {fname, lname, email, password, contact, country, avatar, createdAt})=>{
    //Create a Reviewer object
    const reviewer = {
        fname,
        lname,
        email,
        contact,
        country,
        avatar,
        createdAt
    }

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
        userType:"reviewer"
    }
    //Update the reviewer in the db
    let result = await update(id,reviewer);
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
    createReviewer,
    getReviewers,
    getReviewer,
    deleteReviewer,
    updateReviewer
}
