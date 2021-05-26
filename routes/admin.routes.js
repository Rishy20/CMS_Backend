// Import Koa Router
const Router = require('@koa/router');
// Import Multer
const multer = require("@koa/multer");
// Import file system API
const fs = require("fs");

// Import API methods
const {createAdmin, getAdmins, getAdmin, updateAdmin, deleteAdmin,
    authenticateAdmin} = require('../api/admin.api');

// Set storage path for avatars
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const path = 'public/uploads/images/admins';
        fs.mkdirSync(path, {recursive: true});
        return cb(null, path);
    },
    filename: (req, file, cb) => {
        cb(null, JSON.parse(req.body.values).avatar);
    }
})

// Create multer object
const upload = multer({storage: storage});

// Create router object
const router = new Router({
    prefix: '/api/v1/admins'
})

// Get all admins route
router.get('/', async ctx => {
    ctx.body = await getAdmins();
})

// Insert admin route
router.post('/', async ctx => {
    let admin = ctx.request.body;
    admin = await createAdmin(admin);
    ctx.response.status = 200;
    ctx.body = admin;
})

// Get admin by ID route
router.get('/:id', async ctx => {
    const id = ctx.params.id;
    ctx.body = await getAdmin(id);
})

// Update admin route
router.put('/:id', upload.single('avatar'), async ctx => {
    const id = ctx.params.id;
    let admin = JSON.parse(ctx.request.body.values);
    admin = await updateAdmin(id, admin);
    ctx.status.code = 200;
    ctx.body = admin;
})

// Delete admin route
router.delete('/:id', async ctx => {
    const id = ctx.params.id;
    ctx.body = await deleteAdmin(id);
})

// Authenticate admin route
router.post('/auth', async ctx => {
    const login = ctx.request.body;
    const result = await authenticateAdmin(login);
    ctx.status.code = result.code;
    ctx.body = result.body;
})

// Export the routes
module.exports = router;
