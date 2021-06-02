//Import the methods 
const {getAll, getById, removeById, save, update} = require('../dal/info.dao');


//Map the save() method
const createInfo = async ({abrevation,conferenceName,shortDescription,description,eventType,location,startDate,endDate}) => {

    //Create an Info object
    const Info = {
        abrevation,
        conferenceName,
        shortDescription,
        description,
        eventType,
        location,
        startDate,
        endDate
    }

    // Pass the Info object to save() method
    let result =  await save(Info);

    if(result === 1){
        return {status:"Success"}
    }else{
        return {status:"Fail",msg:"Please try again"}
    }
}
//Map the getAll() method
const getInfos = async ()=>{
    return await getAll();
}
//Map the getById() method
const getInfo = async id =>{
    return await getById(id);
}
//Map the removeById() method
const deleteInfo = async id =>{

    if(result===1){
        return await removeById(id);
    }
    return {status:"Failed",message:"Delete Failed"}
}
//Map the update method
const updateInfo = async (id,{abrevation,conferenceName,shortDescription,description,eventType,location,startDate,endDate})=>{

    //Create an Info object
    const Info = {
        abrevation,
        conferenceName,
        shortDescription,
        description,
        eventType,
        location,
        startDate,
        endDate
    }



    let result = await update(id,Info);
    //Check if update is successful
    if(result === 1){
        return {status:"Success",msg:"Info updated Successfully"}
    }

    return {status:"Fail",msg:"Info update Failed"}
}
//Export the methods to be used in routes
module.exports = {
    createInfo,
    getInfos,
    getInfo,
    deleteInfo,
    updateInfo
}

