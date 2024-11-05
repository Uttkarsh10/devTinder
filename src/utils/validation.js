const validator = require("validator");

const validateSignUpData = (req) => {
    
    const {firstName, lastName, email, password} = req.body;

    if(!firstName || !lastName) {throw new Error("Name is not Valid");}
    // else if(!validator.isEmail(email)) {throw new Error("Invalid Mail ID");}
    else if(!validator.isStrongPassword(password)) {throw new Error("Password is Weak")}
}

module.exports = {validateSignUpData};