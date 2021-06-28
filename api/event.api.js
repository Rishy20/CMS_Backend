const {ObjectId} = require('mongodb');

//Import the methods
const {getAll, getById, removeById, save, update,getByDay} = require('../dal/event.dao');


//Map the save() method
const createEvent = async ({dayNumber,date,time,type,name,researcher,workshop}) => {

    //Create an Event object
    const Event = {
        name,
        type,
        dayNumber,
        date,
        time,
        researcher: type === "Research Proposal" ? ObjectId(researcher) : null,
        workshop: type === "Workshop" ? ObjectId(workshop) : null,
    }

    // Pass the Event object to save() method
    let result =  await save(Event);

    if(result === 1){
        return {status:"Success"}
    }else{
        return {status:"Fail",msg:"Please try again"}
    }
}
//Map the getAll() method
const getEvents = async ()=>{
    return await getAll();
}
//Map the getById() method
const getEvent = async id =>{
    return await getById(id);
}
//Map the removeById() method
const deleteEvent = async id =>{
    return await removeById(id);
}
//Map the update method
const updateEvent = async (id,{dayNumber,date,time,type,name,researcher,workshop})=>{

    //Create an Event object
    const Event = {
        name,
        type,
        dayNumber,
        date,
        time,
        researcher: type === "Research Proposal" ? ObjectId(researcher) : null,
        workshop: type === "Workshop" ? ObjectId(workshop) : null,
    }

    let result = await update(id,Event);
    //Check if update is successful
    if(result === 1){
        return {status:"Success",msg:"Event updated Successfully"}
    }

    return {status:"Fail",msg:"Event update Failed"}
}
const getEventByDay = async day => {
    return await getByDay(day);
}
//Export the methods to be used in routes
module.exports = {
    createEvent,
    getEvents,
    getEvent,
    deleteEvent,
    updateEvent,
    getEventByDay
}

