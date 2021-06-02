//Import Koa router
const Router = require("@koa/router");

//Import api methods
const {createInfo, getInfo, getInfos,updateInfo,deleteInfo} =  require('../api/info.api');

const router = new Router({
    //route prefix
    prefix:'/api/v1/info'
})
//Get All route
router.get('/',async ctx=>{
    ctx.body= await getInfos() ;
})
//Insert route
router.post('/',async ctx=>{
    let Info = ctx.request.body;
    Info = await createInfo(Info);
    //Check if the request is successful
    if(Info.status==="Fail"){
        ctx.response.status = 400;
    }else{
        ctx.response.status = 200;
    }
    ctx.body = Info;
})
//Get By Id route
router.get('/:id',async ctx=>{
    const id = ctx.params.id;
    ctx.body = await getInfo(id);
})
//Delete by id route
router.delete('/:id',async ctx=>{
    const id = ctx.params.id;
    ctx.body = await deleteInfo(id);

})
//Update Route
router.put('/:id', async ctx=>{
    const id = ctx.params.id;
    let Info = ctx.request.body;
    Info = await updateInfo(id,Info);
    //Check if the request is successful
    if(Info.status==="Fail"){
        ctx.response.status = 400;
    }else{
        ctx.response.status = 200;
    }
    ctx.body = Info;
})
//Export the routes
module.exports = router;