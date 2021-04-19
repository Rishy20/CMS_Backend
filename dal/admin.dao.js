// Database name
const DBNAME = process.env.DB_NAME;
// Collection name
const COLLECTION = 'Admins';
// Import the getClient method
const getClient = require('./connection');
// Import ObjectId
const {ObjectId} = require('mongodb');

let admins;

// Establish the connection
getClient().then(data => {
    admins = data.db(DBNAME).collection(COLLECTION);
}).catch(err => {
    console.error(err);
})

// Add an admin
const save = async admin => {
    const result = await admins.insertOne(admin);
    return result.insertedCount;
}

// Get all admins
const getAll = async () => {
    const cursor = await admins.find();
    return cursor.toArray();
}

// Get an admin by ID
const getById = async id => {
    return await admins.findOne({_id: ObjectId(id)});
}

// Update an admin
const update = async (id, admin) => {
    const result = await admins.replaceOne({_id: ObjectId(id)}, admin);
    return result.modifiedCount;
}

// Delete an admin by ID
const removeById = async id => {
    const result = await admins.deleteOne({_id: ObjectId(id)});
    return result.deletedCount;
}

// Export the methods to be used in the API
module.exports = {
    save,
    getAll,
    getById,
    update,
    removeById
}
