//Import the methods 
const {getById,  save, updateStatus,getCount} = require('../dal/notification.dao');


//Map the save() method
const createNotification = async ({title,message,userId,needPayment}) => {

    //Create an notification object
    const notification = {
       title,
        message,
        needPayment,
       isChecked: false,
        createdAt: new Date()
    }

    // Pass the notification object to save() method
    let result =  await save(notification,userId);

    if(result === 1){
        return {status:"Success"}
    }else{
        return {status:"Fail",msg:"Please try again"}
    }
}

//Map the getById() method
const getNotification = async id =>{

    return await getById(id);
}

//Map the getById() method
const getNotificationCount = async id =>{
    const notification = await getCount(id);
    const result = notification.notifications.filter(n=>{
        return n.isChecked === false;
    })
    return result.length;
}

//Map the update method
const updateNotificationStatus = async ({userId})=>{

    //Update the reviewer in the db
    let result = await updateStatus(userId);
    //Check if the update is successful
        if(result === 1){
            return {status:"Success",msg:"Notification updated Successfully"}
        }

    return {status:"Fail",msg:"Notification update Failed"}
}

//Export the methods to be used in routes
module.exports = {
    createNotification,
    getNotification,
    updateNotificationStatus,
    getNotificationCount

}

