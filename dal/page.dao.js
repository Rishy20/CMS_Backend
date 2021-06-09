//Database Name
const DBNAME = process.env.DB_NAME;
//Collection Name
const COLLECTION = 'Pages';
//Import the getClient method
const getClient = require("./connection");
//Import ObjectId
const {ObjectId} = require('mongodb');

let Pages;

//Establish the connection
getClient().then(data=>{
    Pages = data.db(DBNAME).collection(COLLECTION);
}).catch(err=>{
    console.error(err);
});

//Save method
const save = async (page) => {
    const result = await Pages.insertOne(page);
    return result.insertedId;
}
//GetAll method
const getAll = async () =>{
    const cursor = await Pages.find();
    return cursor.toArray();
}
//GetById method
const getByPageName = async (pageName) =>{
    return await Pages.findOne({page:pageName});
}
//Delete method
const removeByPageName = async pageName =>{
    const result = await Pages.deleteOne({page:pageName});
    return result.insertedId;
}
//Update method
const update = async (pageName, page) =>{
    const result = await Pages.replaceOne({page:pageName}, page);
    return result.modifiedCount;
}
//Export the methods
module.exports = {
    getAll,
    getByPageName,
    removeByPageName,
    save,
    update
};