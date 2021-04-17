//Import Koa router
const Router = require("@koa/router");
//Import api methods
const {createResearcher, getResearcher, getResearchers,updateResearcher,deleteResearcher} =  require('../api/researcher.api');

const router = new Router({
    //route prefix
    prefix:'/api/v1/researchers'
})
//Get All route
router.get('/',async ctx=>{
    ctx.body= await getResearchers() ;
})
//Insert route
router.post('/',async ctx=>{
    let Researcher = ctx.request.body;
    Researcher = await createResearcher(Researcher);
    ctx.response.status = 200;
    ctx.body = Researcher;
})
//Get By Id route
router.get('/:id',async ctx=>{
    const id = ctx.params.id;
    ctx.body = await getResearcher(id);
})
//Delete by id route
router.delete('/:id',async ctx=>{
    const id = ctx.params.id;
    ctx.body = await deleteResearcher(id);

})
//Update Route
router.put('/:id',async ctx=>{
    const id = ctx.params.id;
    let researcher = ctx.request.body;
    researcher = await updateResearcher(id,researcher);
    ctx.response.status = 200;
    ctx.body = researcher;
})
//Export the routes
module.exports = router;