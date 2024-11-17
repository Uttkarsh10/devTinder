const express = require('express');

const authRouter = express.Router();

const User = require("../models/user");
const {validateSignUpData} = require("../utils/validation")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

authRouter.post("/signup", async (req,res) => {

    try{
       
       //Validation of data
       validateSignUpData(req);
 
       const {firstName, lastName, email, password} = req.body;
       // Encrypt the password
       const passwordHash = await bcrypt.hash(password, 10);
 
       const user = new User({firstName, lastName, email, password : passwordHash});
    // const user = new User({
    //    firstName : "Tary",
    //    lastName : "Saini",
    //    email : "Taru@gmail.com",
    //    password : "Taru@123",
    // });
 
       await user.save();
       res.send("User Added Successfully");
 
    } catch(err){
       res.status(400).send("Error : " + err.message);
    }
 })
 
 
 authRouter.post("/login", async (req,res) => {
 
    try{
       
       const {email, password} = req.body;
       const user = await User.findOne({email:email});
 
       if(!user) {throw new Error("Invalid Credentials");}
 
       // const isPasswordValid = await bcrypt.compare(password, user.password);
       const isPasswordValid = await user.validatePassword(password);
 
       if(isPasswordValid) {
 
          //Create a jwt token
          // const token = await jwt.sign({_id:user._id}, "devTinder@10", {expiresIn: "7d"});
          const token = await user.getJWT();
 
          res.cookie("token" , token, {expires: new Date(Date.now() + 8*3600000)});
          res.send(user);
       }
 
       else {throw new Error("Invalid Credentials");}
 
    } catch(err){
       res.status(400).send("Error : " + err);
    }
 })


 authRouter.post("/logout", async (req,res) => {
    res.cookie("token" , null, {expires: new Date(Date.now())});
    res.send("Logged out successfully");
 })

module.exports = authRouter;