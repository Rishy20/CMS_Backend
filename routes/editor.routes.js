//Import Koa router
const Router = require("@koa/router");
// Import Multer
const multer = require("@koa/multer");
// Import file system API
const fs = require("fs");
// Import mime-types for returning images as responses
const mime = require('mime-types');

//Import api methods
const {createEditor, getEditor, getEditors, updateEditor, deleteEditor} =  require('../api/editor.api');

// Set storage path for avatars
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const path = 'public/uploads/images/editors';
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
    prefix:'/api/v1/editors'
})

    //Get All route
router.get('/',async ctx=>{
    ctx.body= await getEditors() ;
})
//Insert route
router.post('/',async ctx=>{
    let editor = ctx.request.body;
    editor = await createEditor(editor);
    ctx.response.status = 200;
    ctx.body = editor;
})
//Get By Id route
router.get('/:id',async ctx=>{
    const id = ctx.params.id;
    ctx.body = await getEditor(id);
})
//Delete by id route
router.delete('/:id',async ctx=>{
    const id = ctx.params.id;
    ctx.body = await deleteEditor(id);

})
//Update Route
router.put('/:id', upload.single('avatar'), async ctx=>{
    const id = ctx.params.id;
    let editor = JSON.parse(ctx.request.body.values);
    editor = await updateEditor(id, editor);
    ctx.response.status = 200;
    ctx.body = editor;
})

// Get avatar image route
router.get('/image/:filename', async ctx => {
    // Get filename from the parameter
    const filename = ctx.params.filename;
    // Define image path
    const path = `./public/uploads/images/editors/${filename}`;
    // Create a mime-type and set it as the content type in the response header
    const mimeType = mime.lookup(path);
    ctx.response.set('content-type', mimeType);
    // Create a readable stream of the image and return it as the response
    ctx.body = fs.createReadStream(path);
})

//Export the routes
module.exports = router;