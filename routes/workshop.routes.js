//Import Koa router
const Router = require("@koa/router");
//Import api methods
const {
    createWorkshop,
    getWorkshop,
    getWorkshops,
    updateWorkshop,
    deleteWorkshop,
    getRejectedWorkshops,
    getPendingWorkshops,
    getApprovedWorkshops,
    updateWorkshopStatus,
    getApprovedWorkshopsByReviewer,
    getRejectedWorkshopsByReviewer,
    getApprovedWorkshopCount
} =  require('../api/workshop.api');
//Import multer
const multer = require('@koa/multer');
const mime = require("mime-types");
const fs = require("fs");

let storage = multer.diskStorage({

    destination: function (req, file, cb) {
        if(file.fieldname==="img"){
            cb(null, 'public/uploads/images/presenters')
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
        let Workshop = ctx.request.body;

        if (Workshop.value) {
            Workshop = JSON.parse(Workshop.value);
            let img = ctx.response.request.files.img[0].filename;
            let fileName = ctx.response.request.files.proposal[0].filename;
            Workshop.proposal = fileName;
            Workshop.avatar = img;
        }


        Workshop = await createWorkshop(Workshop);
        ctx.response.status = 200;
        ctx.body = Workshop;
    }catch (e){
        console.log(e);
        ctx.response.status = 401;
    }

})
//Get Approved Workshops route By Reviewer
router.get('/approved/:id',async ctx=>{
    const id = ctx.params.id;
    ctx.body= await getApprovedWorkshopsByReviewer(id);
})
//Get Pending Workshops route By Reviewer
router.get('/rejected/:id',async ctx=>{
    const id = ctx.params.id;
    ctx.body= await getRejectedWorkshopsByReviewer(id);
})
//Get Approved Workshops route
router.get('/approved',async ctx=>{
    ctx.body= await getApprovedWorkshops();
})
//Get Pending Workshops route
router.get('/pending',async ctx=>{
    ctx.body= await getPendingWorkshops();
})
//Get Rejected Workshops route
router.get('/rejected',async ctx=>{
    ctx.body= await getRejectedWorkshops();
})
//Get Count route
router.get('/count',async ctx=> {
    ctx.body= await getApprovedWorkshopCount() ;
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
//Update Proposal Status
router.put('/:id/status',async ctx=>{
    const id = ctx.params.id;
    let Workshop = ctx.request.body;
    Workshop = await updateWorkshopStatus(id,Workshop);
    ctx.response.status = 200;
    ctx.body = Workshop;
})
//Update Route
router.put('/:id',upload.fields([{name:'img',maxCount:1}]),async ctx=>{
    const id = ctx.params.id;
    let Workshop = JSON.parse(ctx.request.body.values);
    if(ctx.request.body.img === undefined){
        let img = ctx.response.request.files.img[0].filename;
        Workshop.avatar = img;
    }
    Workshop = await updateWorkshop(id,Workshop);
    ctx.response.status = 200;
    ctx.body = Workshop;
})
// Get avatar image route
router.get('/image/:filename', async ctx => {
    // Get filename from the parameter
    const filename = ctx.params.filename;
    // Define image path
    const path = `./public/uploads/images/presenters/${filename}`;
    // Create a mime-type and set it as the content type in the response header
    const mimeType = mime.lookup(path);
    ctx.response.set('content-type', mimeType);
    // Create a readable stream of the image and return it as the response
    ctx.body = fs.createReadStream(path);
})
// Get research paper route
router.get('/proposal/:filename', async ctx => {
    // Get filename from the parameter
    const filename = ctx.params.filename;
    // Define image path
    const path = `./public/uploads/Workshop Proposals/${filename}`;
    // Create a mime-type and set it as the content type in the response header
    const mimeType = mime.lookup(path);
    ctx.response.set('content-type', mimeType);
    // Create a readable stream of the image and return it as the response
    ctx.body = fs.createReadStream(path);
})
//Export the routes
module.exports = router;