//Import Koa router
const Router = require("@koa/router");

//Import api methods
const {createPage, getPage, getPages,updatePage,deletePage} =  require('../api/pages.api');

const router = new Router({
    //route prefix
    prefix:'/api/v1/pages'
})
//Get All route
router.get('/',async ctx=>{
    ctx.body= await getPages() ;
})
//Insert route
router.post('/',async ctx=>{
    let page = ctx.request.body;
    page = await createPage(page);
    //Check if the request is successful
    if(page.status==="Fail"){
        ctx.response.status = 400;
    }else{
        ctx.response.status = 200;
    }
    ctx.body = page;
})
//Get By Id route
router.get('/:page',async ctx=>{
    const page = ctx.params.page;
    ctx.body = await getPage(page);
})
//Delete by id route
router.delete('/:page',async ctx=>{
    const page = ctx.params.page;
    ctx.body = await deletePage(page);

})
//Update Route
router.put('/:page', async ctx=>{
    const pageName = ctx.params.page;
    let page = ctx.request.body;
    page = await updatePage(pageName,page);
    //Check if the request is successful
    if(page.status==="Fail"){
        ctx.response.status = 400;
    }else{
        ctx.response.status = 200;
    }
    ctx.body = page;
})
//Export the routes
module.exports = router;