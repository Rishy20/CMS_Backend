// Import methods from the Sponsor DAO
const {save, getAll, getById, update, removeById} =
    require('../dal/sponsor.dao');


// Map the save() method
const createSponsor = async ({name, image}) => {

    // Create a Sponsor object
    const sponsor = {
        name,
        image,
        createdAt: new Date()
    }

    let result = await save(sponsor);
    if(result === 1){
        return {status:"Success"}
    }else{
        return {status:"Fail",msg:"Failed to save, Please try again"}
    }

}

// Map the getAll() method
const getSponsors = async () => {
    return await getAll();
}

// Map the getById() method
const getSponsor = async id => {
    return await getById(id);
}

// Map the update() method
const updateSponsor = async (id, {name, image,createdAt}) => {
    // Create a Sponsor object
    const sponsor = {
        name,
        image,
        createdAt
    }
    let result = await update(id,sponsor);
    if(result === 1){
        return {status:"Success"}
    }else{
        return {status:"Fail",msg:"Failed to save, Please try again"}
    }


}

// Map the removeById() method
const deleteSponsor = async id => {
    return await removeById(id);
}

// Export the methods to be used in routing
module.exports = {
    createSponsor,
    getSponsors,
    getSponsor,
    updateSponsor,
    deleteSponsor
}
