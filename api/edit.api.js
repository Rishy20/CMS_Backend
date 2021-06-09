//Import the methods 
const {getAll, getById, removeById, save, update} = require('../dal/edit.dao');
const {getAll: getInfo, update: updateInfo} = require('../dal/info.dao');

//Map the save() method
const createEdit = async ({editItem, newValue, description}) => {

    //Create an edit object
    const edit = {
        editItem,
        newValue,
        description,
        status: "pending",
    }

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
const updateEdit = async (id, {editItem, newValue, description, status}) => {
    // Create an edit object
    const edit = {
        editItem,
        newValue,
        description,
        status,
    }

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

    // Check if update is successful
    if(result === 1){
        return {status:"Success",msg:"Edit updated Successfully"}
    }

    return {status:"Fail",msg:"Edit update Failed"}
}

//Export the methods to be used in routes
module.exports = {
    createEdit,
    getEdits,
    getEdit,
    deleteEdit,
    updateEdit
}

