const {ObjectId} = require('mongodb');

//Import the methods
const {getAll, getById, removeById, save, update, getByEditor} = require('../dal/edit.dao');
const {getAll: getInfo, update: updateInfo} = require('../dal/info.dao');
const {getById: getEditor} = require('../dal/editor.dao');
const {getAll: getAdmin} = require('../dal/admin.dao');
const {createNotification} = require('./notification.api');

//Map the save() method
const createEdit = async ({editItem, newValue, description, userId}) => {

    //Create an edit object
    const edit = {
        editItem,
        newValue,
        description,
        userId: ObjectId(userId),
        status: "pending",
    }

    // Save editor name
    const editor = await getEditor(userId);
    edit.userName = `${editor.fname} ${editor.lname}`

    // Add notification for admin
    const admin = await getAdmin();
    await createNotification({
        title: `New edit suggestion by ${edit.userName}`,
        message: `Description: ${description}`,
        userId: admin[0] && admin[0]._id
    })

    // Pass the edit object to save() method
    let result =  await save(edit);

    if(result === 1){
        return {status:"Success"}
    }else{
        return {status:"Fail",msg:"Please try again"}
    }
}

//Map the getAll() method
const getEdits = async ()=>{
    return await getAll();
}

//Map the getById() method
const getEdit = async id =>{
    return await getById(id);
}

//Map the removeById() method
const deleteEdit = async id =>{
    return await removeById(id);
}

//Map the update method
const updateEdit = async (id, {editItem, newValue, description, userId, status}) => {
    // Create an edit object
    const edit = {
        editItem,
        newValue,
        description,
        userId: ObjectId(userId),
        status,
    }

    // Save editor name
    const editor = await getEditor(userId);
    edit.userName = `${editor.fname} ${editor.lname}`

    let result;

    // Check if edit is approved and do modifications to Info
    if (status === "approved") {
        let info = await getInfo();
        info = info[0];
        info[editItem] = newValue;
        let updateInfoResult = await updateInfo(info._id, info);
        result = updateInfoResult === 1 &&  await update(id, edit);
    } else {
        result = await update(id,edit);
    }

    // If edit was approved or rejected, set a notification for editor
    if (status === "approved" || status === "rejected") {
        await createNotification({
            title: `Edit ${status}`,
            message: `Description: ${description}`,
            userId: userId
        });
    }

    // Check if update is successful
    if(result === 1){
        return {status:"Success",msg:"Edit updated Successfully"}
    }

    return {status:"Fail",msg:"Edit update Failed"}
}

//Map the getByEditor() method
const getEditByEditor = async id =>{
    return await getByEditor(id);
}

//Export the methods to be used in routes
module.exports = {
    createEdit,
    getEdits,
    getEdit,
    deleteEdit,
    updateEdit,
    getEditByEditor,
}

