require('dotenv').config();
//Require MongoDB
const MongoClient = require('mongodb').MongoClient;
//Connection uri
const uri = process.env.DB_URL;
//Client Connection
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//Connect method
async function connect () {
    await client.connect();
    await client.db(process.env.DB_NAME).command({ ping: 1 });
    console.log("Successfully connected to MongoDB");
    return client;
};
//GetClient method
const getClient = async ()=>{
    await connect();
    return client;
}
//Export getClient
module.exports = getClient;