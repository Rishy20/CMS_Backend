//Database Name
const DBNAME = process.env.DB_NAME;
//Collection Name
const COLLECTION = 'Login';
//Import the getClient method
const getClient = require("./connection");
//Import ObjectId
const {ObjectId} = require('mongodb');

let users;

//Establish the connection
getClient().then(data=>{
    users = data.db(DBNAME).collection(COLLECTION);
}).catch(err=>{
    console.error(err);
});

//Save method
const saveUser = async (user) => {
    const result = await users.insertOne(user);
    return result.insertedCount;
}

//Authenticate method
const getUser = async (email) =>{
    //Check if user exists
    return await users.findOne({email:email});
}
//Update method
const updateUser = async (id, user) =>{
    const result = await users.replaceOne({_id:ObjectId(id)},user);
    return result.modifiedCount;
}
// Delete a login by ID
const deleteLogin = async id => {
    const result = await users.deleteOne({_id: ObjectId(id)});
    return result.deletedCount;
}
//Export the methods
module.exports = {
    saveUser,
    getUser,
    updateUser,
    deleteLogin
};