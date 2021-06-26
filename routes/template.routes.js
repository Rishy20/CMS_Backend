// Import Koa Router
const Router = require('@koa/router');
// Import Multer for file uploading
const multer = require('@koa/multer');
// Import file system API for creating directories
const fs = require('fs');
// Import mime-types for returning images as responses
const mime = require('mime-types');

// Import API methods
const {createTemplate, getTemplates, getTemplate, updateTemplate, deleteTemplate} = require('../api/template.api');

// Set storage path for avatars
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const path = 'public/uploads/Templates';
        fs.mkdirSync(path, {recursive: true});
        return cb(null, path);
    },
    filename: (req, file, cb) => {
        cb(null, JSON.parse(req.body.values).file);
    }
})

// Create multer object
const upload = multer({storage: storage});

// Create router object
const router = new Router({
    prefix: '/api/v1/templates'
})

// Get all Templates route
router.get('/', async ctx => {
    ctx.body = await getTemplates();
})

// Insert Template route
router.post('/',upload.single('file'), async ctx => {
    let template = JSON.parse(ctx.request.body.values);
    template = await createTemplate(template);
    ctx.response.status = 200;
    ctx.body = template;
})

// Get Template by ID route
router.get('/:id', async ctx => {
    const id = ctx.params.id;
    ctx.body = await getTemplate(id);
})

// Update Template route
router.put('/:id', upload.single('file'), async ctx => {
    const id = ctx.params.id;
    let template = JSON.parse(ctx.request.body.values);
    template = await updateTemplate(id, template);
    ctx.status.code = 200;
    ctx.body = template;
})

// Delete Template route
router.delete('/:id', async ctx => {
    const id = ctx.params.id;
    ctx.body = await deleteTemplate(id);
})

// Get avatar image route
router.get('/file/:filename', async ctx => {
    // Get filename from the parameter
    const filename = ctx.params.filename;
    // Define image path
    const path = `./public/uploads/Templates/${filename}`;
    // Create a mime-type and set it as the content type in the response header
    const mimeType = mime.lookup(path);
    ctx.response.set('content-type', mimeType);
    // Create a readable stream of the image and return it as the response
    ctx.body = fs.createReadStream(path);
})

// Export the routes
module.exports = router;
