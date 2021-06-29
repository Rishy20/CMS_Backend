// Import Koa Router
const Router = require('@koa/router');
// Import Multer for file uploading
const multer = require('@koa/multer');
// Import file system API for creating directories
const fs = require('fs');
// Import mime-types for returning images as responses
const mime = require('mime-types');

// Import API methods
const {createTrack, getTracks, getTrack, updateTrack, deleteTrack} = require('../api/track.api');

// Set storage path for avatars
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const path = 'public/uploads/Tracks';
        fs.mkdirSync(path, {recursive: true});
        return cb(null, path);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

// Create multer object
const upload = multer({storage: storage});

// Create router object
const router = new Router({
    prefix: '/api/v1/tracks'
})

// Get all Tracks route
router.get('/', async ctx => {
    ctx.body = await getTracks();
})

// Insert Track route
router.post('/',upload.single('image'), async ctx => {
    let track = JSON.parse(ctx.request.body.values);
    track = await createTrack(track);
    ctx.response.status = 200;
    ctx.body = track;
})

// Get Track by ID route
router.get('/:id', async ctx => {
    const id = ctx.params.id;
    ctx.body = await getTrack(id);
})

// Update Track route
router.put('/:id', upload.single('image'), async ctx => {
    const id = ctx.params.id;
    let track = JSON.parse(ctx.request.body.values);
    track = await updateTrack(id, track);
    ctx.status.code = 200;
    ctx.body = track;
})

// Delete Track route
router.delete('/:id', async ctx => {
    const id = ctx.params.id;
    ctx.body = await deleteTrack(id);
})

// Get avatar image route
router.get('/image/:filename', async ctx => {
    // Get filename from the parameter
    const filename = ctx.params.filename;
    // Define image path
    const path = `./public/uploads/Tracks/${filename}`;
    // Create a mime-type and set it as the content type in the response header
    const mimeType = mime.lookup(path);
    ctx.response.set('content-type', mimeType);
    // Create a readable stream of the image and return it as the response
    ctx.body = fs.createReadStream(path);
})

// Export the routes
module.exports = router;
