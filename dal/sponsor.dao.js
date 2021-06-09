// Database name
const DBNAME = process.env.DB_NAME;
// Collection name
const COLLECTION = 'Sponsors';
// Import the getClient method
const getClient = require('./connection');
// Import ObjectId
const {ObjectId} = require('mongodb');

let sponsors;

// Establish the connection
getClient().then(data => {
    sponsors = data.db(DBNAME).collection(COLLECTION);
}).catch(err => {
    console.error(err);
})

// Add an sponsor
const save = async sponsor => {
    const result = await sponsors.insertOne(sponsor);
    return result.insertedId;
}

// Get all sponsors
const getAll = async () => {
    const cursor = await sponsors.find();
    return cursor.toArray();
}

// Get an sponsor by ID
const getById = async id => {
    return await sponsors.findOne({_id: ObjectId(id)});
}

// Update an sponsor
const update = async (id, sponsor) => {
    const result = await sponsors.replaceOne({_id: ObjectId(id)}, sponsor);
    return result.modifiedCount;
}

// Delete an sponsor by ID
const removeById = async id => {
    const result = await sponsors.deleteOne({_id: ObjectId(id)});
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

