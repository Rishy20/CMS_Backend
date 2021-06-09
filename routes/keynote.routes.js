//Import Koa router
const Router = require("@koa/router");

//Import api methods
const {createKeynote, getKeynote, getKeynotes,updateKeynote,deleteKeynote} =  require('../api/keynote.api');

const router = new Router({
    //route prefix
    prefix:'/api/v1/keynotes'
})
//Get All route
router.get('/',async ctx=>{
    ctx.body= await getKeynotes() ;
})
//Insert route
router.post('/',async ctx=>{
    let keynote = ctx.request.body;
    keynote = await createKeynote(keynote);
    //Check if the request is successful
    if(keynote.status==="Fail"){
        ctx.response.status = 400;
    }else{
        ctx.response.status = 200;
    }
    ctx.body = keynote;
})
//Get By Id route
router.get('/:id',async ctx=>{
    const id = ctx.params.id;
    ctx.body = await getKeynote(id);
})
//Delete by id route
router.delete('/:id',async ctx=>{
    const id = ctx.params.id;
    ctx.body = await deleteKeynote(id);

})
//Update Route
router.put('/:id', async ctx=>{
    const id = ctx.params.id;
    let keynote = ctx.request.body;
    keynote = await updateKeynote(id,keynote);
    //Check if the request is successful
    if(keynote.status==="Fail"){
        ctx.response.status = 400;
    }else{
        ctx.response.status = 200;
    }
    ctx.body = keynote;
})
//Export the routes
module.exports = router;