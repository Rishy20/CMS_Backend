// Import methods from the Admin DAO
const {save, getAll, getById, update, removeById} =
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

// Export the methods to be used in routing
module.exports = {
    createAdmin,
    getAdmins,
    getAdmin,
    updateAdmin,
    deleteAdmin
}
