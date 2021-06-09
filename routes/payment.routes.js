//Import Koa router
const Router = require("@koa/router");

//Import api methods
const {makePayment,getPayments} =  require('../api/payment.api');

const router = new Router({
    //route prefix
    prefix:'/api/v1/payments'
})
//Get All route
router.get('/',async ctx=>{
    ctx.body= await getPayments() ;
})
//Insert route
router.post('/',async ctx=>{
    let payment = ctx.request.body;
    payment = await makePayment(payment);
    //Check if the request is successful
    if(payment.status==="Fail"){
        ctx.response.status = 400;
    }else{
        ctx.response.status = 200;
    }
    ctx.body = payment;
})

//Export the routes
module.exports = router;