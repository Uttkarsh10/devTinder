const { Mongoose, default: mongoose } = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    email : String,
    password : String,
    gender : String,
    age : Number
});

const User = mongoose.model("User", userSchema);

module.exports = User;