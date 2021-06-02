//Import Koa router
const Router = require("@koa/router");

//Import api methods
const {createAttendee, getAttendee, getAttendees,updateAttendee,deleteAttendee} =  require('../api/attendee.api');

const router = new Router({
    //route prefix
    prefix:'/api/v1/attendees'
})
//Get All route
router.get('/',async ctx=>{
    ctx.body= await getAttendees() ;
})
//Insert route
router.post('/',async ctx=>{
    let attendee = ctx.request.body;
    attendee = await createAttendee(attendee);
    //Check if the request is successful
    if(attendee.status==="Fail"){
        ctx.response.status = 400;
    }else{
        ctx.response.status = 200;
    }
    ctx.body = attendee;
})
//Get By Id route
router.get('/:id',async ctx=>{
    const id = ctx.params.id;
    ctx.body = await getAttendee(id);
})
//Delete by id route
router.delete('/:id',async ctx=>{
    const id = ctx.params.id;
    ctx.body = await deleteAttendee(id);

})
//Update Route
router.put('/:id', async ctx=>{
    const id = ctx.params.id;
    let attendee = ctx.request.body;
    attendee = await updateAttendee(id,attendee);
    //Check if the request is successful
    if(attendee.status==="Fail"){
        ctx.response.status = 400;
    }else{
        ctx.response.status = 200;
    }
    ctx.body = attendee;
})
//Export the routes
module.exports = router;