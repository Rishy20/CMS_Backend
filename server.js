//Import Koa
const Koa = require('koa');
//Import body-parser
const bodyParser = require('koa-bodyparser');
//Import the routes

const editorRoutes = require('./routes/editor.routes');
const researcherRoutes = require('./routes/researcher.routes');
const adminRoutes = require('./routes/admin.routes');
const reviewerRoutes = require('./routes/reviewer.routes');
const workshopRoutes = require('./routes/workshop.routes');
const loginRoutes = require('./routes/login.routes');
const attendeeRoutes = require('./routes/attendee.routes')
const infoRoutes = require('./routes/info.routes')

const notificationRoutes = require('./routes/notification.routes')
const trackRoutes = require('./routes/track.routes')
const sponsorRoutes = require('./routes/sponsor.routes')
const templateRoutes = require('./routes/template.routes')
const paymentRoutes = require('./routes/payment.routes')
const keynoteRoutes = require('./routes/keynote.routes')
const pagesRoutes = require('./routes/pages.routes')

const editRoutes = require('./routes/edit.routes');
const eventRoutes = require('./routes/event.routes');


//Import cors
const cors = require('@koa/cors');



//Start app
const app = new Koa();
//Use BodyParser
app.use(bodyParser());

//Use cors
app.use(cors());

//Registering the Researcher routes

app.use(editorRoutes.routes()).use(editorRoutes.allowedMethods());
app.use(researcherRoutes.routes()).use(researcherRoutes.allowedMethods());
//Registering the Admin routes
app.use(adminRoutes.routes()).use(adminRoutes.allowedMethods());
//Registering the Reviewer routes
app.use(reviewerRoutes.routes()).use(reviewerRoutes.allowedMethods());
app.use(workshopRoutes.routes()).use(workshopRoutes.allowedMethods());
app.use(loginRoutes.routes()).use(loginRoutes.allowedMethods());
app.use(attendeeRoutes.routes()).use(attendeeRoutes.allowedMethods());
app.use(infoRoutes.routes()).use(infoRoutes.allowedMethods());
app.use(notificationRoutes.routes()).use(notificationRoutes.allowedMethods());
app.use(trackRoutes.routes()).use(trackRoutes.allowedMethods());
app.use(sponsorRoutes.routes()).use(sponsorRoutes.allowedMethods());
app.use(templateRoutes.routes()).use(templateRoutes.allowedMethods());
app.use(paymentRoutes.routes()).use(paymentRoutes.allowedMethods());
app.use(keynoteRoutes.routes()).use(keynoteRoutes.allowedMethods());
app.use(pagesRoutes.routes()).use(pagesRoutes.allowedMethods());
app.use(editRoutes.routes()).use(editRoutes.allowedMethods());
app.use(eventRoutes.routes()).use(eventRoutes.allowedMethods());

//Setup the port
let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port);
console.log("Application is running on port 3000");