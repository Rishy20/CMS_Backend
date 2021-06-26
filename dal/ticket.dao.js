//Database Name
const DBNAME = process.env.DB_NAME;
//Collection Name
const COLLECTION = 'Tickets';
//Import the getClient method
const getClient = require("./connection");
//Import ObjectId
const {ObjectId} = require('mongodb');

let tickets;

//Establish the connection
getClient().then(data=>{
    tickets = data.db(DBNAME).collection(COLLECTION);
}).catch(err=>{
    console.error(err);
});

//Save method
const save = async (ticket) => {
    const result = await tickets.insertOne(ticket);
    return result.insertedId;
}
//GetAll method
const getAll = async () =>{
    const cursor = await tickets.find();
    return cursor.toArray();
}
//GetById method
const getById = async (id) =>{
    return await tickets.findOne({_id:ObjectId(id)});
}
//Delete method
const removeById = async id =>{
    const result = await tickets.deleteOne({_id:ObjectId(id)});
    return result.deletedCount;
}
//Update method
const update = async (id, ticket) =>{
    const result = await tickets.replaceOne({_id:ObjectId(id)}, ticket);
    return result.modifiedCount;
}
//Export the methods
module.exports = {
    getAll,
    getById,
    removeById,
    save,
    update
};