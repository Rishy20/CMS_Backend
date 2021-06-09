//Database Name
const DBNAME = process.env.DB_NAME;
//Collection Name
const COLLECTION = 'Payments';
//Import the getClient method
const getClient = require("./connection");
//Import ObjectId
const {ObjectId} = require('mongodb');

let payments;

//Establish the connection
getClient().then(data=>{
    payments = data.db(DBNAME).collection(COLLECTION);
}).catch(err=>{
    console.error(err);
});

//Save method
const save = async (payment) => {
    const result = await payments.insertOne(payment);
    return result.insertedCount;
}
// Get all payments
const getAll = async () => {
    const cursor = await payments.find();
    return cursor.toArray();
}

//Export the methods
module.exports = {
    save,
    getAll
};