//Import Koa router
const Router = require("@koa/router");

//Import api methods
const {createNotification, getNotification,updateNotificationStatus, getNotificationCount} =  require('../api/notification.api');

const router = new Router({
    //route prefix
    prefix:'/api/v1/notification'
})

//Insert route
router.post('/',async ctx=>{
    let notification = ctx.request.body;
    notification = await createNotification(notification);
    //Check if the request is successful
    if(notification.status==="Fail"){
        ctx.response.status = 400;
    }else{
        ctx.response.status = 200;
    }
    ctx.body = notification;
})
//Get By Id route
router.get('/count/:id',async ctx=>{
    const id = ctx.params.id;
    ctx.body = await getNotificationCount(id);
})
//Get By Id route
router.get('/:id',async ctx=>{
    const id = ctx.params.id;
    ctx.body = await getNotification(id);
})


//Get By Id route
router.put('/',async ctx=>{
    let notification = ctx.request.body;
    ctx.body = await updateNotificationStatus(notification);
})


//Export the routes
module.exports = router;