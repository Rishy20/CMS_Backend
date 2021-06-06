//Import the methods
const {getAll, getById, removeById, save, update} = require('../dal/editor.dao');
//Require bcrypt
const bcrypt = require('bcrypt');
const {saveUser,updateUser,deleteLogin,getUserById} = require("../dal/login.dao")

//Map the save() method
const createEditor = async ({fname,lname,email,password,contact}) => {

    //Encrypt the password
    password = await bcrypt.hash(password,5);
    //Create an editor object
    const editor = {
        fname,
        lname,
        email,
        contact,
        status: "pending",
        createdAt: new Date()
    }
    // Pass the editor object to save() method
    let editorId =  await save(editor);

    //Create a user object to save them in the Login collection
    const user = {
        _id:editorId,
        email,
        password,
        userType:"editor",
        status: "pending"
    }
    let id = await saveUser(user);
    if(id === 1){
        return {status:"Success"}
    }else{
        return {status:"Fail",msg:"Failed to create Login in the database"}
    }
}
//Map the getAll() method
const getEditors = async ()=>{
    return await getAll();
}
//Map the getById() method
const getEditor = async id =>{
    return await getById(id);
}
//Map the removeById() method
const deleteEditor = async id =>{
    let result = await deleteLogin(id);
    if (result === 1) {
        return await removeById(id);
    }
    return {status:"Failed",message:"Delete Failed"}
}
//Map the update method
const updateEditor = async (id, {fname, lname, email, password, contact, avatar, status, createdAt})=>{
    //Create a researcher object
    const editor = {
        fname,
        lname,
        email,
        contact,
        avatar,
        status,
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
        userType:"editor",
        status
    }
    //Update the admin in the db
    let result = await update(id,editor);
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
    createEditor,
    getEditors,
    getEditor,
    deleteEditor,
    updateEditor
}