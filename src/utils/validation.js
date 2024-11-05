const validator = require("validator");

const validateSignUpData = (req) => {
    
    const {firstname, lastname, emailId, password} = req.body;

    if(!firstname || !lastname) {throw new Error("Name is not Valid");}
    else if(!validator.isEmail(value)) {throw new Error("Invalid Mail ID");}
    else if(!validator.isStrongPassword(value)) {throw new Error("Password is Weak")}
}

module.exports = {validateSignUpData};