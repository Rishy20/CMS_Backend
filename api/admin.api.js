// Import methods from the Admin DAO
const {save, getAll, getById, update, removeById} =
    require('../dal/admin.dao');
const {saveUser,updateUser,deleteLogin,getUserById} = require("../dal/login.dao");
// Import bcrypt for password encryption
const bcrypt = require('bcrypt');

// Map the save() method
const createAdmin = async ({fname, lname, email, password, contact}) => {
    // Encrypt the password
    password = await bcrypt.hash(password, 5);

    // Create an Admin object
    const admin = {
        fname,
        lname,
        email,
        contact,
        createdAt: new Date()
    }

    // Pass the Admin object to save() method
    let adminId =  await save(admin);

    //Create a user object to save them in the Login collection
    const user = {
        _id:adminId,
        email,
        password,
        userType:"admin"
    }
    let id = await saveUser(user);
    if(id === 1){
        return {status:"Success"}
    }else{
        return {status:"Fail",msg:"Failed to create Login in the database"}
    }

}

// Map the getAll() method
const getAdmins = async () => {
    return await getAll();
}

// Map the getById() method
const getAdmin = async id => {
    return await getById(id);
}

// Map the update() method
const updateAdmin = async (id, {fname, lname, email, password, contact, avatar, createdAt}) => {
    // Create an admin object
    const admin = {
        fname,
        lname,
        email,
        contact,
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
        userType:"admin"
    }
    //Update the admin in the db
    let result = await update(id, admin);
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

// Map the removeById() method
const deleteAdmin = async id => {
    let result = await deleteLogin(id);
    if(result===1){
        return await removeById(id);
    }
    return {status:"Failed",message:"Delete Failed"}
}

// Export the methods to be used in routing
module.exports = {
    createAdmin,
    getAdmins,
    getAdmin,
    updateAdmin,
    deleteAdmin
}
