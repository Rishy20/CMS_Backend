//Import the methods 
const {getAll, getById, removeById, save, update} = require('../dal/ticket.dao');

//Map the save() method
const createTicket = async ({name, description, price, qty}) => {

    //Create an Ticket object
    const Ticket = {
        name,
        description,
        price,
        qty,
    }

    // Pass the Ticket object to save() method
    let result =  await save(Ticket);

    if(result === 1){
        return {status:"Success"}
    }else{
        return {status:"Fail",msg:"Please try again"}
    }
}
//Map the getAll() method
const getTickets = async ()=>{
    return await getAll();
}
//Map the getById() method
const getTicket = async id =>{
    return await getById(id);
}
//Map the removeById() method
const deleteTicket = async id =>{
    return await removeById(id);
}
//Map the update method
const updateTicket = async (id, {name, description, price, qty})=>{

    //Create an Ticket object
    const Ticket = {
        name,
        description,
        price,
        qty,
    }

    let result = await update(id,Ticket);
    //Check if update is successful
    if(result === 1){
        return {status:"Success",msg:"Ticket updated Successfully"}
    }

    return {status:"Fail",msg:"Ticket update Failed"}
}
//Export the methods to be used in routes
module.exports = {
    createTicket,
    getTickets,
    getTicket,
    deleteTicket,
    updateTicket
}

