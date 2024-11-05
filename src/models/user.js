const { Mongoose, default: mongoose } = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minLength : 4,
        maxLength : 50,
    },
    lastName : String,
    email : {
        type: String,
        unique: true,
        trim: true,
       
    },
    password : {
        type: String,
        // validate(value){
        //     if(!validator.isStrongPassword(value)) throw new Error("Weak Password " + value);
        // }
    },
    gender : {
        type: String,
        validate(value){
            if(!["Male", "Female", "Others"].includes(value)) throw new Error("Invalid Gender " + value);
        }
    },
    age : {
        type : Number,
        min : 18
    },

    about : {
        type : String,
        default : "This is a default about",
    },

    skills : {
        type : [String],
    }
},

{
    timestamps:true,
},
);

const User = mongoose.model("User", userSchema);

module.exports = User;