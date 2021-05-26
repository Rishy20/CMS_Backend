//Import Koa router
const Router = require("@koa/router");
// Import Multer
const multer = require("@koa/multer");
// Import file system API
const fs = require("fs");
// Import mime-types for returning images as responses
const mime = require('mime-types');

//Import api methods
const {createReviewer, getReviewer, getReviewers,updateReviewer,deleteReviewer} =  require('../api/reviewer.api');

// Set storage path for avatars
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const path = 'public/uploads/images/reviewers';
        fs.mkdirSync(path, {recursive: true});
        return cb(null, path);
    },
    filename: (req, file, cb) => {
        cb(null, JSON.parse(req.body.values).avatar);
    }
})

// Create multer object
const upload = multer({storage: storage});

const router = new Router({
    //route prefix
    prefix:'/api/v1/reviewers'
})
//Get All route
router.get('/',async ctx=>{
    ctx.body= await getReviewers() ;
})
//Insert route
router.post('/',async ctx=>{
    let reviewer = ctx.request.body;
    reviewer = await createReviewer(reviewer);
    ctx.response.status = 200;
    ctx.body = reviewer;
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
router.put('/:id', upload.single('avatar'), async ctx=>{
    const id = ctx.params.id;
    let reviewer = JSON.parse(ctx.request.body.values);
    reviewer = await updateReviewer(id,reviewer);
    ctx.response.status = 200;
    ctx.body = reviewer;
})

// Get avatar image route
router.get('/image/:filename', async ctx => {
    // Get filename from the parameter
    const filename = ctx.params.filename;
    // Define image path
    const path = `./public/uploads/images/reviewers/${filename}`;
    // Create a mime-type and set it as the content type in the response header
    const mimeType = mime.lookup(path);
    ctx.response.set('content-type', mimeType);
    // Create a readable stream of the image and return it as the response
    ctx.body = fs.createReadStream(path);
})

//Export the routes
module.exports = router;