//Import the methods
const {getUser} = require('../dal/login.dao');
//Require bcrypt
const bcrypt = require('bcrypt');
//Require jwt
const jwt = require('jsonwebtoken');
//Get the secret key
const secret = process.env.SECRET;

//Method to authenticate the User
const authenticateUser = async ({email,password}) => {

    //Check if the user is a valid user
    const result = await getUser(email);
    if(result){
        //Check if password is correct
        if( await bcrypt.compare(password,result.password)){

            const id = result._id;
            const userType = result.userType;
            // Check if user is of an admin panel related type
            if (["researcher","workshop"].includes(userType)) {
                //Create a JSON Web token
                const token = jwt.sign({id, userType}, secret, {
                    expiresIn: 86400
                })
                //Return the token to the client
                return {auth: true, token: token, usertype: userType}
            }
        }else {
            return {auth:false,message:"Password Incorrect"}
        }
    }else {
        return {auth:false,message:"User not found"}
    }


}

//Method to authenticate the Admin user
const authenticateAdminUser = async ({email,password}) => {
    //Check if the user is a valid user
    const result = await getUser(email);
    if (result) {

        //Check if password is correct
        if (await bcrypt.compare(password,result.password)) {
            const id = result._id;
            const userType = result.userType;

            // Check if user is of an admin panel related type
            if (["admin","reviewer","editor"].includes(userType)){

                // Check if user account is activated
                if (result.status === "active" || !result.status) {
                    //Create a JSON Web token
                    const token = jwt.sign({id,userType},secret,{
                        expiresIn: 86400
                    });
                    //Return the token to the client
                    return {auth: true, token:token, usertype:userType};
                } else if (result.status === "pending") {
                    return {auth: false, message: "Account not activated yet"}
                } else if (result.status === "suspended") {
                    return {auth: false, message: "Account is suspended"}
                }
            } else {
                return {auth: false, message: "Access denied"}
            }

        } else {
            return {auth: false, message: "Password is incorrect"}
        }
    } else {
        return {auth: false, message: "Account not found"}
    }


}

//Export the method to be used in routes
module.exports = {authenticateUser,authenticateAdminUser};

