//Import Koa router
const Router = require("@koa/router");

//Import api methods
const {createEdit, getEdit, getEdits, updateEdit, deleteEdit, getEditByEditor} =  require('../api/edit.api');

const router = new Router({
    //route prefix
    prefix:'/api/v1/edits'
})
//Get All route
router.get('/',async ctx=>{
    ctx.body= await getEdits() ;
})
//Insert route
router.post('/',async ctx=>{
    let edit = ctx.request.body;
    edit = await createEdit(edit);

    //Check if the request is successful
    if (edit.status === "Fail") {
        ctx.response.status = 400;
    } else {
        ctx.response.status = 200;
    }
    ctx.body = edit;
})
//Get By Id route
router.get('/:id',async ctx=>{
    const id = ctx.params.id;
    ctx.body = await getEdit(id);
})
//Delete by id route
router.delete('/:id',async ctx=>{
    const id = ctx.params.id;
    ctx.body = await deleteEdit(id);

})
//Update Route
router.put('/:id', async ctx=>{
    const id = ctx.params.id;
    let edit = ctx.request.body;
    edit = await updateEdit(id, edit);

    //Check if the request is successful
    if (edit.status === "Fail") {
        ctx.response.status = 400;
    } else {
        ctx.response.status = 200;
    }
    ctx.body = edit;
})
//Get By Id route
router.get('/editor/:id',async ctx=>{
    const id = ctx.params.id;
    ctx.body = await getEditByEditor(id);
})
//Export the routes
module.exports = router;