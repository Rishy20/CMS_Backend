//Import the methods 
const {getAll, getByPageName, removeByPageName, save, update} = require('../dal/page.dao');


//Map the save() method
const createPage = async ({html,page}) => {

    //Create a Page object
    const Page = {
        page,
        html,
    }

    // Pass the Page object to save() method
    let result =  await save(Page);

    if(result === 1){
        return {status:"Success"}
    }else{
        return {status:"Fail",msg:"Please try again"}
    }
}
//Map the getAll() method
const getPages = async ()=>{
    return await getAll();
}
//Map the getById() method
const getPage = async page =>{
    return await getByPageName(page);
}
//Map the removeById() method
const deletePage = async page =>{

    if(result===1){
        return await removeByPageName(page);
    }
    return {status:"Failed",message:"Delete Failed"}
}
//Map the update method
const updatePage = async (pageName,{html,page})=>{

    //Create an Page object
    const Page = {
        html,
        page
    }


    let result = await update(pageName,Page);
    //Check if update is successful
    if(result === 1){
        return {status:"Success",msg:"Page updated Successfully"}
    }

    return {status:"Fail",msg:"Page update Failed"}
}
//Export the methods to be used in routes
module.exports = {
    createPage,
    getPages,
    getPage,
    deletePage,
    updatePage
}

