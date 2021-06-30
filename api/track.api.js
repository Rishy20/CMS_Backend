// Import methods from the Track DAO
const {save, getAll, getById, update, removeById} =
    require('../dal/track.dao');


// Map the save() method
const createTrack = async ({name, image}) => {

    // Create a Track object
    const track = {
        name,
        image,
        createdAt: new Date()
    }

    let result = await save(track);
    if(result === 1){
        return {status:"Success"}
    }else{
        return {status:"Fail",msg:"Failed to save, Please try again"}
    }

}

// Map the getAll() method
const getTracks = async () => {
    return await getAll();
}

// Map the getById() method
const getTrack = async id => {
    return await getById(id);
}

// Map the update() method
const updateTrack = async (id, {name, image,createdAt}) => {
    // Create a Track object
    const track = {
        name,
        image,
        createdAt
    }
    let result = await update(id,track);
    if(result === 1){
        return {status:"Success"}
    }else{
        return {status:"Fail",msg:"Failed to save, Please try again"}
    }


}

// Map the removeById() method
const deleteTrack = async id => {
    return await removeById(id);
}

// Export the methods to be used in routing
module.exports = {
    createTrack,
    getTracks,
    getTrack,
    updateTrack,
    deleteTrack
}
