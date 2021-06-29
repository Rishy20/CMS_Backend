const {save,getAll} =  require('../dal/payment.dao');
const {updateResearcherPayment} = require('./researcher.api')
//Map the getAll() method
const getPayments = async ()=>{
    return await getAll();
}
// Import ObjectId
const {ObjectId} = require('mongodb');
//Map the save() method
const makePayment = async ({paymentId, userId, amount, reason}) => {

    //Create a payment object
    const payment = {
        _id:paymentId,
        userId:ObjectId(userId),
        amount,
        reason,
        createdAt: new Date()
    }

    // Pass the payment object to save() method
    let result =  await save(payment);

    if(result === 1){
        if(reason === "Paper Submission"){
            result = await updateResearcherPayment(userId,paymentId);
            if(result === 1){
                return {status:"Success"}
            }else{
                return {status:"Fail",msg:"Please try again"}
            }
        }
        return {status:"Success"}

    }else{
        return {status:"Fail",msg:"Please try again"}
    }
}



//Export the methods to be used in routes
module.exports = {
    makePayment,
    getPayments
}

