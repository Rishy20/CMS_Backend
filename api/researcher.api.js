//Import the methods 
const {
    getAll,
    getById,
    removeById,
    save,
    update,
    updatePaymentId,
    getApproved,
    getRejected,
    getPending,
    updateStatus,
    getRejectedByReviewer,
    getApprovedByReviewer,
    getApprovedCount
} = require('../dal/researcher.dao');

const {createNotification} = require("../api/notification.api");
const {saveUser,deleteLogin,updateUser,getUserById} = require("../dal/login.dao");
//Require bcrypt
const bcrypt = require('bcrypt');

//Import nodemailer to handle mails
const nodemailer = require('nodemailer');

//Map the save() method
const createResearcher = async ({fname,lname,contact,researchTitle,email,password,country,jobTitle,company,avatar,paper}) => {

    //Encrypt the password
    password = await bcrypt.hash(password,5);
    //Create a researcher object
    const researcher = {
        fname,
        lname,
        email,
        contact,
        researchTitle,
        country,
        jobTitle,
        company,
        avatar,
        paper,
        status:"pending",
        paymentId: null,
        createdAt: new Date()
    }

    // Pass the Researcher object to save() method
    let researcherId =  await save(researcher);

    //Create a user object to save them in the Login collection
    const user = {
        _id:researcherId,
        email,
        password,
        userType:"researcher"
    }
    let id = await saveUser(user);
    if(id === 1){
        return {status:"Success"}
    }else{
        return {status:"Fail",msg:"Failed to create Login in the database"}
    }
}
//Map the getAll() method
const getResearchers = async ()=>{
    return await getAll();
}
//Map the getApproved() method
const getApprovedResearchers = async ()=>{
    return await getApproved();
}
//Map the getPending() method
const getPendingResearchers = async ()=>{
    return await getPending();
}
//Map the getRejected() method
const getRejectedResearchers = async ()=>{
    return await getRejected();
}
//Map the getApprovedByReviewer() method
const getApprovedResearchersByReviewer = async (id)=>{
    return await getApprovedByReviewer(id);
}
//Map the getRejectedByReviewer() method
const getRejectedResearchersByReviewer = async (id)=>{
    return await getRejectedByReviewer(id);
}
//Map the getById() method
const getResearcher = async id =>{
    return await getById(id);
}
//Map the removeById() method
const deleteResearcher = async id =>{
    let result = await deleteLogin(id);
    if(result===1){
        return await removeById(id);
    }
    return {status:"Failed",message:"Delete Failed"}
}
const getApprovedResearcherCount = async () => {
    return await getApprovedCount();
}
//Map the update method
const updateResearcher = async (id,{fname,lname,contact,researchTitle,email,password,country,jobTitle,company,avatar,paper,createdAt,status,reviewerId,paymentId})=>{
    //Create a researcher object
    const researcher = {
        fname,
        lname,
        email,
        contact,
        researchTitle,
        country,
        jobTitle,
        company,
        avatar,
        paper,
        createdAt,
        status,
        reviewerId,
        paymentId
    }

    //Update the researcher in the db
    let result = await update(id,researcher);
    // Check whether a password is given or not
    if (password) {
        // Encrypt the new password
        password = await bcrypt.hash(password, 5);
    } else {
        // Use existing password if the password given is null
        await getUserById(id).then(data => password = data.password);
    }
    //Create a user object to update them in the Login collection
    const user = {
        email,
        password,
        userType:"researcher"
    }
    //Check if the update is successful
    if(result === 1){
        //Update the login credentials
        result = await updateUser(id,user);
        //Check if update is successful
        if(result === 1){
            return {status:"Success",msg:"User updated Successfully"}
        }
    }
    return {status:"Fail",msg:"User update Failed"}
}
const updatePaperStatus = async (id,{reviewerId,status}) => {

    const researcher = await getById(id);
    if(status==="approved") {
        await createNotification({
            title: "Research Paper approved",
            message: "Congratulations, your research paper got approved. " +
                "Please click here to make the necessary payments to complete your paper submission",
            userId: id,
            needPayment:true
        })

        //Call sendEmail method to send an email
        sendEmail(researcher.email,'Research Paper Approved',`Congratulations. Your research paper has been approved. Please make the necessary payment to complete your submission.`);
    }else if(status==="rejected"){
        await createNotification({
            title: "Research Paper rejected",
            message: "Sorry, your research paper got rejected. " +
                "Please try again next year",
            userId: id
        })
        //Call sendEmail method to send an email
        sendEmail(researcher.email,'Research Paper Rejected',`Sorry, Your research paper has been rejected. Please come back next year.`);

    }
    return await updateStatus(id,reviewerId,status)
}

const updateResearcherPayment = async (id,paymentId) =>{
    return await updatePaymentId(id,paymentId)
}
//This method handles sending emails
const sendEmail = (email,subject,message)=>{

    //Authenticate the email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    //Message
    const mailOptions = {
        from: 'ICAF',
        to: email,
        subject: subject,
        text: message
    };
    //Send Email
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        }
    });
}

//Export the methods to be used in routes
module.exports = {
    createResearcher,
    getResearchers,
    getResearcher,
    deleteResearcher,
    updateResearcher,
    updateResearcherPayment,
    getApprovedResearchers,
    getPendingResearchers,
    getRejectedResearchers,
    updatePaperStatus,
    getApprovedResearchersByReviewer,
    getRejectedResearchersByReviewer,
    getApprovedResearcherCount
}

