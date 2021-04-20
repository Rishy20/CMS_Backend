//Import Koa
const Koa = require('koa');
//Import body-parser
const bodyParser = require('koa-bodyparser');
//Import the routes
const editorRoutes = require('./routes/editor.routes');


//Start app
const app = new Koa();
//Use BodyParser
app.use(bodyParser());

//Registering the Researcher routes
app.use(editorRoutes.routes()).use(editorRoutes.allowedMethods());


//Setup the port
app.listen(3000);
console.log("Application is running on port 3000");