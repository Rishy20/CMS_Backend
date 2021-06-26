//Import Koa router
const Router = require("@koa/router");

//Import api methods
const {createTicket, getTicket, getTickets, updateTicket, deleteTicket} =  require('../api/ticket.api');

const router = new Router({
    //route prefix
    prefix:'/api/v1/tickets'
})
//Get All route
router.get('/',async ctx=>{
    ctx.body= await getTickets() ;
})
//Insert route
router.post('/',async ctx=>{
    let ticket = ctx.request.body;
    ticket = await createTicket(ticket);

    //Check if the request is successful
    if (ticket.status === "Fail") {
        ctx.response.status = 400;
    } else {
        ctx.response.status = 200;
    }
    ctx.body = ticket;
})
//Get By Id route
router.get('/:id',async ctx=>{
    const id = ctx.params.id;
    ctx.body = await getTicket(id);
})
//Delete by id route
router.delete('/:id',async ctx=>{
    const id = ctx.params.id;
    ctx.body = await deleteTicket(id);

})
//Update Route
router.put('/:id', async ctx=>{
    const id = ctx.params.id;
    let ticket = ctx.request.body;
    ticket = await updateTicket(id, ticket);

    //Check if the request is successful
    if (ticket.status === "Fail") {
        ctx.response.status = 400;
    } else {
        ctx.response.status = 200;
    }
    ctx.body = ticket;
})
//Export the routes
module.exports = router;