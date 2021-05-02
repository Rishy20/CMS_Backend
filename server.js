//Import Koa
const Koa = require('koa');
//Import body-parser
const bodyParser = require('koa-bodyparser');
//Import the routes
const researcherRoutes = require('./routes/researcher.routes');
const adminRoutes = require('./routes/admin.routes');
const reviewerRoutes = require('./routes/reviewer.routes');
//Import cors
const cors = require('@koa/cors');

//Start app
const app = new Koa();
//Use BodyParser
app.use(bodyParser());
//Use cors
app.use(cors());

//Registering the Researcher routes
app.use(researcherRoutes.routes()).use(researcherRoutes.allowedMethods());
//Registering the Admin routes
app.use(adminRoutes.routes()).use(adminRoutes.allowedMethods());


//Registering the Reviewer routes
app.use(reviewerRoutes.routes()).use(reviewerRoutes.allowedMethods());

//Setup the port
app.listen(3000);
console.log("Application is running on port 3000");