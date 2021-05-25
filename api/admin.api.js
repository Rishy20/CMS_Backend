// Import methods from the Admin DAO
const {save, getAll, getById, update, removeById, getByEmail} =
    require('../dal/admin.dao');
const {saveUser,updateUser,deleteLogin} = require("../dal/login.dao");
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
        contact
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
const updateAdmin = async (id, {fname, lname, email, password, contact, avatar}) => {
    // Create an admin object
    const admin = {
        fname,
        lname,
        email,
        contact,
        avatar
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

// Authenticate admin by checking email, and then the password
const authenticateAdmin = async ({email, password}) => {
    // Create default response
    let response = {code: 401, body: {msg: "User does not exist"}};
    // Get user by email, if exists
    const admin = await getByEmail(email);

    if (admin) {
        // Compare the entered password with the stored password of the user
        if (await bcrypt.compare(password, admin.password)) {
            // If password matches, send success code and user details as response
            response.code = 200;
            response.body = admin;
        } else {
            response.body = {msg: "Password is incorrect"};
        }
    }

    return response;
}

// Export the methods to be used in routing
module.exports = {
    createAdmin,
    getAdmins,
    getAdmin,
    updateAdmin,
    deleteAdmin,
    authenticateAdmin
}
