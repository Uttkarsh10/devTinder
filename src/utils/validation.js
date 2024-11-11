const validator = require("validator");

const validateSignUpData = (req) => {
    
    const {firstName, lastName, email, password} = req.body;

    if(!firstName || !lastName) {throw new Error("Name is not Valid");}
    // else if(!validator.isEmail(email)) {throw new Error("Invalid Mail ID");}
    else if(!validator.isStrongPassword(password)) {throw new Error("Password is Weak")}
}


const validateEditProfileData = (req) => {
    const allowedEditFields = ["firstname", "lastname", "emailId", "gender", "age", "about", "skills"];

    const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field));

    return isEditAllowed;
}

module.exports = {validateSignUpData, validateEditProfileData};