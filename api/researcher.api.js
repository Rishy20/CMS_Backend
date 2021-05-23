//Import the methods 
const {getAll, getById, removeById, save, update} = require('../dal/researcher.dao');
//Require bcrypt
const bcrypt = require('bcrypt');
//Map the save() method
const createResearcher = async ({fname,lname,gender,email,password,contact,country,jobTitle,company,img,file}) => {

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
        country,
        jobTitle,
        company,
        img,
        file
    }
    //Call the Save method and pass the Researcher object
    console.log(Researcher);
    return await save(Researcher);
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
    return await removeById(id);
}
//Map the update method
const updateResearcher = async (id,{fname,lname,gender,email,password,contact,country,jobTitle,company,img,file})=>{
    //Create a researcher object
    const Researcher = {
        fname,
        lname,
        gender,
        email,
        contact,
        password,
        country,
        jobTitle,
        company,
        img,
        file
    }
    return await update(id,Researcher);
}
//Export the methods to be used in routes
module.exports = {
    createResearcher,
    getResearchers,
    getResearcher,
    deleteResearcher,
    updateResearcher
}
