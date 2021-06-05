//Import the methods 
const {getAll, getById, removeById, save, update} = require('../dal/attendee.dao');


//Map the save() method
const createAttendee = async ({fname,lname,contact,email,city,country,ticket}) => {

    //Create a Attendee object
    const attendee = {
        fname,
        lname,
        email,
        contact,
        city,
        country,
        ticket,
        createdAt: new Date()
    }

    // Pass the Attendee object to save() method
    let result =  await save(attendee);

    if(result === 1){
        return {status:"Success"}
    }else{
        return {status:"Fail",msg:"User already exists"}
    }
}
//Map the getAll() method
const getAttendees = async ()=>{
    return await getAll();
}
//Map the getById() method
const getAttendee = async id =>{
    return await getById(id);
}
//Map the removeById() method
const deleteAttendee = async id =>{

    if(result===1){
        return await removeById(id);
    }
    return {status:"Failed",message:"Delete Failed"}
}
//Map the update method
const updateAttendee = async (id,{fname,lname,contact,email,city,country,ticket,createdAt})=>{

    //Create a Attendee object
    const attendee = {
        fname,
        lname,
        email,
        contact,
        city,
        country,
        ticket,
        createdAt
    }


    let result = await update(id,attendee);
    //Check if update is successful
    if(result === 1){
        return {status:"Success",msg:"Attendee updated Successfully"}
    }

    return {status:"Fail",msg:"Attendee update Failed"}
}
//Export the methods to be used in routes
module.exports = {
    createAttendee,
    getAttendees,
    getAttendee,
    deleteAttendee,
    updateAttendee
}

