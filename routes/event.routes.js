//Import Koa router
const Router = require("@koa/router");

//Import api methods
const {createEvent, getEvent, getEvents, updateEvent, deleteEvent} =  require('../api/event.api');

const router = new Router({
    //route prefix
    prefix:'/api/v1/events'
})
//Get All route
router.get('/',async ctx=>{
    ctx.body= await getEvents() ;
})
//Insert route
router.post('/',async ctx=>{
    let event = ctx.request.body;
    event = await createEvent(event);

    //Check if the request is successful
    if (event.status === "Fail") {
        ctx.response.status = 400;
    } else {
        ctx.response.status = 200;
    }
    ctx.body = event;
})
//Get By Id route
router.get('/:id',async ctx=>{
    const id = ctx.params.id;
    ctx.body = await getEvent(id);
})
//Delete by id route
router.delete('/:id',async ctx=>{
    const id = ctx.params.id;
    ctx.body = await deleteEvent(id);

})
//Update Route
router.put('/:id', async ctx=>{
    const id = ctx.params.id;
    let event = ctx.request.body;
    event = await updateEvent(id, event);

    //Check if the request is successful
    if (event.status === "Fail") {
        ctx.response.status = 400;
    } else {
        ctx.response.status = 200;
    }
    ctx.body = event;
})
//Export the routes
module.exports = router;