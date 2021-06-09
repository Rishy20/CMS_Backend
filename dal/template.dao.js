// Database name
const DBNAME = process.env.DB_NAME;
// Collection name
const COLLECTION = 'Templates';
// Import the getClient method
const getClient = require('./connection');
// Import ObjectId
const {ObjectId} = require('mongodb');

let templates;

// Establish the connection
getClient().then(data => {
    templates = data.db(DBNAME).collection(COLLECTION);
}).catch(err => {
    console.error(err);
})

// Add an template
const save = async template => {
    const result = await templates.insertOne(template);
    return result.insertedId;
}

// Get all templates
const getAll = async () => {
    const cursor = await templates.find();
    return cursor.toArray();
}

// Get an template by ID
const getById = async id => {
    return await templates.findOne({_id: ObjectId(id)});
}

// Update an template
const update = async (id, template) => {
    const result = await templates.replaceOne({_id: ObjectId(id)}, template);
    return result.modifiedCount;
}

// Delete an template by ID
const removeById = async id => {
    const result = await templates.deleteOne({_id: ObjectId(id)});
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

