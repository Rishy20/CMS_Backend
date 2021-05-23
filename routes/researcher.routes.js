//Import Koa router
const Router = require("@koa/router");
//Import api methods
const {createResearcher, getResearcher, getResearchers,updateResearcher,deleteResearcher} =  require('../api/researcher.api');
//Import multer
const multer = require('@koa/multer');

let storage = multer.diskStorage({

    destination: function (req, file, cb) {
        if(file.fieldname==="img"){
            cb(null, 'public/uploads/images/')
        }else if(file.fieldname==="paper"){
            cb(null, 'public/uploads/ResearchPapers/')
        }else if(file.fieldname==="proposal"){
            cb(null, 'public/uploads/Workshop Presenters/')
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
//Insert route
router.post('/',upload.fields([{name:'img',maxCount:1},{name:'paper',maxCount:1},{name:'proposal',maxCount:1}]),async ctx=>{

    try {
        let Researcher = JSON.parse(ctx.request.body.value);
        let img = ctx.response.request.files.img[0].filename;
        let fileName = ctx.response.request.files.proposal[0].filename;
        Researcher.file = fileName;
        Researcher.img = img;
        console.log(img);
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
//Update Route
router.put('/:id',async ctx=>{
    const id = ctx.params.id;
    let researcher = ctx.request.body;
    researcher = await updateResearcher(id,researcher);
    ctx.response.status = 200;
    ctx.body = researcher;
})
//Export the routes
module.exports = router;