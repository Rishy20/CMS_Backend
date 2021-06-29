//Import Koa router
const Router = require("@koa/router");
//Import api methods
const {
    createResearcher,
    getResearcher,
    getResearchers,
    updateResearcher,
    deleteResearcher,
    getApprovedResearchers,
    getRejectedResearchers,
    getPendingResearchers,
    updatePaperStatus,
    getApprovedResearchersByReviewer,
    getRejectedResearchersByReviewer,
    getApprovedResearcherCount
} =  require('../api/researcher.api');
//Import multer
const multer = require('@koa/multer');
const mime = require("mime-types");
const fs = require("fs");

let storage = multer.diskStorage({

    destination: function (req, file, cb) {
        if(file.fieldname==="img"){
            cb(null, 'public/uploads/images/researchers')
        }else if(file.fieldname==="paper"){
            cb(null, 'public/uploads/ResearchPapers/')
        }
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})


const upload = multer({storage:storage});


const router = new Router({
    //route prefix
    prefix:'/api/v1/researchers'
})
//Get All route
router.get('/',async ctx=>{
    ctx.body= await getResearchers() ;
})
//Get Approved Researchers by Reviewer route
router.get('/approved/:id',async ctx=>{
    const id = ctx.params.id;
    ctx.body= await getApprovedResearchersByReviewer(id);
})

//Get Rejected Researchers by Reviewer route
router.get('/rejected/:id',async ctx=>{
    const id = ctx.params.id;
    ctx.body= await getRejectedResearchersByReviewer(id);
})
//Get Approved Researchers route
router.get('/approved',async ctx=>{
    ctx.body= await getApprovedResearchers();
})
//Get Pending Researchers route
router.get('/pending',async ctx=>{
    ctx.body= await getPendingResearchers();
})
//Get Rejected Researchers route
router.get('/rejected',async ctx=>{
    ctx.body= await getRejectedResearchers();
})
//Get Count route
router.get('/count',async ctx=> {
    ctx.body= await getApprovedResearcherCount() ;
})
//Insert route
router.post('/',upload.fields([{name:'img',maxCount:1},{name:'paper',maxCount:1}]),async ctx=>{

    try {

        let Researcher = ctx.request.body;

        if (Researcher.value) {
            Researcher = JSON.parse(Researcher.value);
            let img = ctx.response.request.files.img[0].filename;
            let fileName = ctx.response.request.files.paper[0].filename;
            Researcher.paper = fileName;
            Researcher.avatar = img;
        }


        Researcher = await createResearcher(Researcher);
        ctx.response.status = 200;
        ctx.body = Researcher;
    }catch (e){
        console.log(e);
        ctx.response.status = 401;
    }
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
//Update Paper Status
router.put('/:id/status', async ctx=>{
    const id = ctx.params.id;
    let researcher = ctx.request.body;
    researcher = await updatePaperStatus(id,researcher)
    ctx.response.status = 200;
    ctx.body = researcher;
})
//Update Route
router.put('/:id' , upload.single('img'),async ctx=>{
    const id = ctx.params.id
    let researcher = JSON.parse(ctx.request.body.values);
    researcher = await updateResearcher(id,researcher);
    ctx.response.status = 200;
    ctx.body = researcher;
})

// Get avatar image route
router.get('/image/:filename', async ctx => {
    // Get filename from the parameter
    const filename = ctx.params.filename;
    // Define image path
    const path = `./public/uploads/images/researchers/${filename}`;
    // Create a mime-type and set it as the content type in the response header
    const mimeType = mime.lookup(path);
    ctx.response.set('content-type', mimeType);
    // Create a readable stream of the image and return it as the response
    ctx.body = fs.createReadStream(path);
})
// Get research paper route
router.get('/paper/:filename', async ctx => {
    // Get filename from the parameter
    const filename = ctx.params.filename;
    // Define image path
    const path = `./public/uploads/ResearchPapers/${filename}`;
    // Create a mime-type and set it as the content type in the response header
    const mimeType = mime.lookup(path);
    ctx.response.set('content-type', mimeType);
    // Create a readable stream of the image and return it as the response
    ctx.body = fs.createReadStream(path);
})

//Export the routes
module.exports = router;