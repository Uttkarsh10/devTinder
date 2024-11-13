const { Mongoose, default: mongoose } = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken")

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

userSchema.index({firstName:1, lastName:1});

userSchema.methods.getJWT = async function() {
    const user = this;
     
    const token = await jwt.sign({_id:user._id}, "devTinder@10", {expiresIn: "7d"});

    return token;
}

userSchema.methods.validatePassword = async function(passwordInput) {
    const user = this;
    const passwordHash = user.password;
     
    const isPasswordValid = await bcrypt.compare(passwordInput, passwordHash);

    return isPasswordValid;
}

const User = mongoose.model("User", userSchema);

module.exports = User;