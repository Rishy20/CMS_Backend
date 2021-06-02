//Import Koa router
const Router = require("@koa/router");
//Import api methods
const {createWorkshop, getWorkshop, getWorkshops,updateWorkshop,deleteWorkshop} =  require('../api/workshop.api');
//Import multer
const multer = require('@koa/multer');

let storage = multer.diskStorage({

    destination: function (req, file, cb) {
        if(file.fieldname==="img"){
            cb(null, 'public/uploads/images/')
        }else if(file.fieldname==="proposal"){
            cb(null, 'public/uploads/Workshop Proposals/')
        }
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})


const upload = multer({storage:storage});


const router = new Router({
    //route prefix
    prefix:'/api/v1/workshops'
})
//Get All route
router.get('/',async ctx=>{
    ctx.body= await getWorkshops() ;
})
//Insert route
router.post('/',upload.fields([{name:'img',maxCount:1},{name:'proposal',maxCount:1}]),async ctx=>{

    try {
        let Workshop = JSON.parse(ctx.request.body.value);
        let img = ctx.response.request.files.img[0].filename;
        let fileName = ctx.response.request.files.proposal[0].filename;
        Workshop.proposal = fileName;
        Workshop.img = img;
        Workshop = await createWorkshop(Workshop);
        ctx.response.status = 200;
        ctx.body = Workshop;
    }catch (e){
        console.log(e);
        ctx.response.status = 401;
    }

})
//Get By Id route
router.get('/:id',async ctx=>{
    const id = ctx.params.id;
    ctx.body = await getWorkshop(id);
})
//Delete by id route
router.delete('/:id',async ctx=>{
    const id = ctx.params.id;
    ctx.body = await deleteWorkshop(id);

})
//Update Route
router.put('/:id',async ctx=>{
    const id = ctx.params.id;
    let Workshop = ctx.request.body;
    Workshop = await updateWorkshop(id,Workshop);
    ctx.response.status = 200;
    ctx.body = Workshop;
})
//Export the routes
module.exports = router;