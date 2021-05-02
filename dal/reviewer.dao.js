// Database name
const DBNAME = process.env.DB_NAME;
// Collection name
const COLLECTION = 'Reviewers';
// Import the getClient method
const getClient = require('./connection');
// Import ObjectId
const {ObjectId} = require('mongodb');

let reviewers;

// Establish the connection
getClient().then(data => {
    reviewers = data.db(DBNAME).collection(COLLECTION);
}).catch(err => {
    console.error(err);
})

// Add an reviewer
const save = async reviewer => {
    const result = await reviewers.insertOne(reviewer);
    return result.insertedCount;
}

// Get all reviewers
const getAll = async () => {
    const cursor = await reviewers.find();
    return cursor.toArray();
}

// Get an reviewer by ID
const getById = async id => {
    return await reviewers.findOne({_id: ObjectId(id)});
}
// Update an reviewer
const update = async (id, reviewer) => {
    const result = await reviewers.replaceOne({_id: ObjectId(id)}, reviewer);
    return result.modifiedCount;
}
// Delete an reviewer by ID
const removeById = async id => {
    const result = await reviewers.deleteOne({_id: ObjectId(id)});
    return result.deletedCount;
}


// Export the methods to be used in the API
module.exports = {
    save,
    getAll,
    getById,
    update,
    removeById,

}
