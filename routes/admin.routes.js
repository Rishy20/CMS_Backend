// Import Koa Router
const Router = require('@koa/router');
// Import API methods
const {createAdmin, getAdmins, getAdmin, updateAdmin, deleteAdmin} =
    require('../api/admin.api');

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
router.put('/:id', async ctx => {
    const id = ctx.params.id;
    let admin = ctx.request.body;
    admin = await updateAdmin(id, admin);
    ctx.status.code = 200;
    ctx.body = admin;
})

// Delete admin route
router.delete('/:id', async ctx => {
    const id = ctx.params.id;
    ctx.body = await deleteAdmin(id);
})

// Export the routes
module.exports = router;
