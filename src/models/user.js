const { Mongoose, default: mongoose } = require("mongoose")
const {validator} = require("validator")

const userSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    email : {
        type: String,
        validate(value){
            if(!validator.isEmail(value)) throw new Error("Invalid Emaild Id : " + value);
        }
    },
    password : String,
    gender : String,
    age : Number
});

const User = mongoose.model("User", userSchema);

module.exports = User;