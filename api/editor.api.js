//Import the methods
const {getAll, getById, removeById, save, update} = require('../dal/editor.dao');
//Require bcrypt
const bcrypt = require('bcrypt');
const {saveUser,updateUser,deleteLogin} = require("../dal/login.dao")

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

    }
    // Pass the editor object to save() method
    let editorId =  await save(editor);

    //Create a user object to save them in the Login collection
    const user = {
        _id:editorId,
        email,
        password,
        userType:"editor"
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
    let result = deleteLogin(id);
    if(result===1){
        return await removeById(id);
    }
    return {status:"Failed",message:"Delete Failed"}
}
//Map the update method
const updateEditor = async (id,{fname,lname,email,password,contact})=>{
    //Create a researcher object
    const editor = {
        fname,
        lname,
        email,
        contact,
    }

    //Create a user object to update them in the Login collection
    const user = {
        _id:id,
        email,
        password,
        userType:"editor"
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