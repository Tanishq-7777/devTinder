const validator = require("validator");
const validateSignUpData = (req) => {
    const {firstName,lastName,emailId,password} = req.body;
    if(!firstName || !lastName){
        throw new Error("Name is Required.")
    }
    if(firstName.length < 2 ||firstName.length>30){
        throw new Error("Name is not Valid");
    }
    if(!validator.isEmail(emailId)){
        throw new Error("Email is not Valid")
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Password is not Strong")
    }


}
module.exports = {
    validateSignUpData
}