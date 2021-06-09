// Import Koa Router
const Router = require('@koa/router');
// Import Multer for file uploading
const multer = require('@koa/multer');
// Import file system API for creating directories
const fs = require('fs');
// Import mime-types for returning images as responses
const mime = require('mime-types');

// Import API methods
const {createSponsor, getSponsors, getSponsor, updateSponsor, deleteSponsor} = require('../api/sponsor.api');

// Set storage path for avatars
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const path = 'public/uploads/Sponsors';
        fs.mkdirSync(path, {recursive: true});
        return cb(null, path);
    },
    filename: (req, file, cb) => {
        cb(null, JSON.parse(req.body.values).image);
    }
})

// Create multer object
const upload = multer({storage: storage});

// Create router object
const router = new Router({
    prefix: '/api/v1/sponsors'
})

// Get all Sponsors route
router.get('/', async ctx => {
    ctx.body = await getSponsors();
})

// Insert Sponsor route
router.post('/',upload.single('image'), async ctx => {
    let sponsor = JSON.parse(ctx.request.body.values);
    sponsor = await createSponsor(sponsor);
    ctx.response.status = 200;
    ctx.body = sponsor;
})

// Get Sponsor by ID route
router.get('/:id', async ctx => {
    const id = ctx.params.id;
    ctx.body = await getSponsor(id);
})

// Update Sponsor route
router.put('/:id', upload.single('image'), async ctx => {
    const id = ctx.params.id;
    let sponsor = JSON.parse(ctx.request.body.values);
    sponsor = await updateSponsor(id, sponsor);
    ctx.status.code = 200;
    ctx.body = sponsor;
})

// Delete Sponsor route
router.delete('/:id', async ctx => {
    const id = ctx.params.id;
    ctx.body = await deleteSponsor(id);
})

// Get avatar image route
router.get('/image/:filename', async ctx => {
    // Get filename from the parameter
    const filename = ctx.params.filename;
    // Define image path
    const path = `./public/uploads/Sponsors/${filename}`;
    // Create a mime-type and set it as the content type in the response header
    const mimeType = mime.lookup(path);
    ctx.response.set('content-type', mimeType);
    // Create a readable stream of the image and return it as the response
    ctx.body = fs.createReadStream(path);
})

// Export the routes
module.exports = router;
