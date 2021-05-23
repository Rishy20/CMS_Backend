//Import Koa router
const Router = require("@koa/router");
//Import api methods
const {createReviewer, getReviewer, getReviewers,updateReviewer,deleteReviewer} =  require('../api/reviewer.api');
const router = new Router({
    //route prefix
    prefix:'/api/v1/reviewer'
})
//Get All route
router.get('/',async ctx=>{
    ctx.body= await getReviewers() ;
})
//Insert route
router.post('/',async ctx=>{
    let Reviewer = ctx.request.body;
    Reviewer = await createReviewer(Reviewer);
    ctx.response.status = 200;
    ctx.body = Reviewer;
})
//Get By Id route
router.get('/:id',async ctx=>{
    const id = ctx.params.id;
    ctx.body = await getReviewer(id);
})
//Delete by id route
router.delete('/:id',async ctx=>{
    const id = ctx.params.id;
    ctx.body = await deleteReviewer(id);

})
//Update Route
router.put('/:id',async ctx=>{
    const id = ctx.params.id;
    let reviewer = ctx.request.body;
    reviewer = await updateReviewer(id,reviewer);
    ctx.response.status = 200;
    ctx.body = reviewer;
})
//Export the routes
module.exports = router;