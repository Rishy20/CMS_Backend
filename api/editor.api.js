//Import the methods
const {getAll, getById, removeById, save, update} = require('../dal/researcher.dao');
//Require bcrypt
const bcrypt = require('bcrypt');
//Map the save() method
const createEditor = async ({fname,lname,gender,email,password,contact,city}) => {

    //Encrypt the password
    password = await bcrypt.hash(password,5);
    //Create a researcher object
    const Researcher = {
        fname,
        lname,
        gender,
        email,
        password,
        contact,
        city
    }
    //Call the Save method and pass the Researcher object
    return await save(Editor);
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
    return await removeById(id);
}
//Map the update method
const updateEditor = async (id,{fname,lname,gender,email,password,contact,city})=>{
    //Create a researcher object
    const Researcher = {
        fname,
        lname,
        gender,
        email,
        contact,
        city
    }
    return await update(id,Editor);
}
//Export the methods to be used in routes
module.exports = {
    createEditor,
    getEditors,
    getEditor,
    deleteEditor,
    updateEditor
}