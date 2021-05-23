// Import methods from the Admin DAO
const {save, getAll, getById, update, removeById, getByEmail} =
    require('../dal/admin.dao');
// Import bcrypt for password encryption
const bcrypt = require('bcrypt');

// Map the save() method
const createAdmin = async ({fname, lname, email, password, phone}) => {
    // Encrypt the password
    password = await bcrypt.hash(password, 5);

    // Create an Admin object
    const admin = {
        fname,
        lname,
        email,
        password,
        phone
    }

    // Pass the Admin object to save() method
    return await save(admin);
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
const updateAdmin = async (id, {fname, lname, email, password, phone}) => {
    // Create an admin object
    const admin = {
        fname,
        lname,
        email,
        password,
        phone
    }

    return await update(id, admin);
}

// Map the removeById() method
const deleteAdmin = async id => {
    return await removeById(id);
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
