//Import the methods
const {getAll, getById, removeById, save, update} = require('../dal/reviewer.dao');
//Require bcrypt
const bcrypt = require('bcrypt');
//Map the save() method
const createReviewer = async ({fname,lname,email,password,contact,country}) => {

    //Encrypt the password
    password = await bcrypt.hash(password,5);
    //Create a reviewer object
    const Reviewer = {
        fname,
        lname,
        email,
        password,
        contact,
        country,
    }
    //Call the Save method and pass the Reviewer object
    return await save(Reviewer);
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
    return await removeById(id);
}
//Map the update method
const updateReviewer = async (id,{fname,lname,email,password,contact,country})=>{
    //Create a Reviewer object
    const Reviewer = {
        fname,
        lname,
        email,
        contact,
        country,
        password,
    }
    return await update(id,Reviewer);
}
//Export the methods to be used in routes
module.exports = {
    createReviewer,
    getReviewers,
    getReviewer,
    deleteReviewer,
    updateReviewer
}
