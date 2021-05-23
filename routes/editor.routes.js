//Import Koa router
const Router = require("@koa/router");
//Import api methods
const {createResearcher, getResearcher, getResearchers,updateResearcher,deleteResearcher} =  require('../api/editor.api');

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
    let Editor = ctx.request.body;
    Editor = await createEditor(Editor);
    ctx.response.status = 200;
    ctx.body = Editor;
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
router.put('/:id',async ctx=>{
    const id = ctx.params.id;
    let editor = ctx.request.body;
    editor = await updateEditor(id,editor);
    ctx.response.status = 200;
    ctx.body = editor;
})
//Export the routes
module.exports = router;