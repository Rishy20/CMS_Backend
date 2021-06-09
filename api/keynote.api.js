//Import the methods 
const {getAll, getById, removeById, save, update} = require('../dal/keynote.dao');


//Map the save() method
const createKeynote = async ({fname,lname,jobTitle,company,country,bio,img}) => {

    //Create an Keynote object
    const keynote = {
        fname,
        lname,
        jobTitle,
        company,
        country,
        bio,
        img
    }

    // Pass the Keynote object to save() method
    let result =  await save(keynote);

    if(result === 1){
        return {status:"Success"}
    }else{
        return {status:"Fail",msg:"Please try again"}
    }
}
//Map the getAll() method
const getKeynotes = async ()=>{
    return await getAll();
}
//Map the getById() method
const getKeynote = async id =>{
    return await getById(id);
}
//Map the removeById() method
const deleteKeynote = async id =>{

    if(result===1){
        return await removeById(id);
    }
    return {status:"Failed",message:"Delete Failed"}
}
//Map the update method
const updateKeynote = async (id,{fname,lname,jobTitle,company,country,bio,img})=>{

    //Create an Keynote object
    const keynote = {
        fname,
        lname,
        jobTitle,
        company,
        country,
        bio,
        img
    }


    let result = await update(id,keynote);
    //Check if update is successful
    if(result === 1){
        return {status:"Success",msg:"Keynote updated Successfully"}
    }

    return {status:"Fail",msg:"Keynote update Failed"}
}
//Export the methods to be used in routes
module.exports = {
    createKeynote,
    getKeynotes,
    getKeynote,
    deleteKeynote,
    updateKeynote
}

