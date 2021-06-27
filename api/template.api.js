// Import methods from the Template DAO
const {save, getAll, getById, update, removeById} =
    require('../dal/template.dao');


// Map the save() method
const createTemplate = async ({name, file}) => {

    // Create a Template object
    const template = {
        name,
        file,
        createdAt: new Date()
    }

    let result = await save(template);
    if(result === 1){
        return {status:"Success"}
    }else{
        return {status:"Fail",msg:"Failed to save, Please try again"}
    }

}

// Map the getAll() method
const getTemplates = async () => {
    return await getAll();
}

// Map the getById() method
const getTemplate = async id => {
    return await getById(id);
}

// Map the update() method
const updateTemplate = async (id, {name, file,createdAt}) => {
    // Create a Template object
    const template = {
        name,
        file,
        createdAt
    }
    let result = await update(id,template);
    if(result === 1){
        return {status:"Success"}
    }else{
        return {status:"Fail",msg:"Failed to save, Please try again"}
    }


}

// Map the removeById() method
const deleteTemplate = async id => {
    return await removeById(id);
}

// Export the methods to be used in routing
module.exports = {
    createTemplate,
    getTemplates,
    getTemplate,
    updateTemplate,
    deleteTemplate
}
