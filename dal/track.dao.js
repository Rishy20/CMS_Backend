// Database name
const DBNAME = process.env.DB_NAME;
// Collection name
const COLLECTION = 'Tracks';
// Import the getClient method
const getClient = require('./connection');
// Import ObjectId
const {ObjectId} = require('mongodb');

let tracks;

// Establish the connection
getClient().then(data => {
    tracks = data.db(DBNAME).collection(COLLECTION);
}).catch(err => {
    console.error(err);
})

// Add an track
const save = async track => {
    const result = await tracks.insertOne(track);
    return result.insertedId;
}

// Get all tracks
const getAll = async () => {
    const cursor = await tracks.find();
    return cursor.toArray();
}

// Get an track by ID
const getById = async id => {
    return await tracks.findOne({_id: ObjectId(id)});
}

// Update an track
const update = async (id, track) => {
    const result = await tracks.replaceOne({_id: ObjectId(id)}, track);
    return result.modifiedCount;
}

// Delete an track by ID
const removeById = async id => {
    const result = await tracks.deleteOne({_id: ObjectId(id)});
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

