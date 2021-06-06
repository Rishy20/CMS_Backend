//Database Name
const DBNAME = process.env.DB_NAME;
//Collection Name
const COLLECTION = 'Attendees';
//Import the getClient method
const getClient = require("./connection");
//Import ObjectId
const {ObjectId} = require('mongodb');

let attendees;

//Establish the connection
getClient().then(data=>{
    attendees = data.db(DBNAME).collection(COLLECTION);
}).catch(err=>{
    console.error(err);
});

//Save method
const save = async (attendee) => {

    if (await attendees.countDocuments({email:attendee.email},limit=1) === 0){
        const result = await attendees.insertOne(attendee);
        return result.insertedCount;
    }else{
        return 0;
    }


}
//GetAll method
const getAll = async () =>{
    const cursor = await attendees.find();
    return cursor.toArray();
}
//GetById method
const getById = async (id) =>{
    return await attendees.findOne({_id:ObjectId(id)});
}
//Delete method
const removeById = async id =>{
    const result = await attendees.deleteOne({_id:ObjectId(id)});
    return result.deletedCount;
}
//Update method
const update = async (id, attendee) =>{
    const result = await attendees.replaceOne({_id:ObjectId(id)}, attendee);
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