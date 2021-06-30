//Database Name
const DBNAME = process.env.DB_NAME;
//Collection Name
const COLLECTION = 'Notification';
//Import the getClient method
const getClient = require("./connection");
//Import ObjectId
const {ObjectId} = require('mongodb');

let notifications;

//Establish the connection
getClient().then(data=>{
    notifications = data.db(DBNAME).collection(COLLECTION);
}).catch(err=>{
    console.error(err);
});

//Save method
const save = async ({title,message,isChecked,createdAt,needPayment},userId) => {
    let result;
    if (await notifications.countDocuments({userId:ObjectId(userId)},limit=1) != 0){
        result =  await notifications.updateOne({userId:ObjectId(userId)},{
            $addToSet:{
                notifications:{
                    title,
                    message,
                    isChecked,
                    createdAt,
                    needPayment
                }
            }
        })
        return result.modifiedCount;
    }else{
        result = await notifications.insertOne({
            userId:ObjectId(userId),
            notifications:[
                {
                    title,
                    message,
                    isChecked,
                    createdAt,
                    needPayment
                }
            ]
        });
        return result.insertedId;
    }

}
const getCount = async (id) =>{
    return await notifications.findOne({userId:ObjectId(id)});
}
//GetById method
const getById = async (id) =>{
    return await notifications.findOne({userId:ObjectId(id)});
}
//Update method
const updateStatus = async (id) =>{
    const result = await notifications.updateMany({userId:ObjectId(id)},
        {$set:{"notifications.$[].isChecked":true}}
        );
    return result.modifiedCount;
}

//Export the methods
module.exports = {

    getById,
    save,
    updateStatus,
    getCount

};