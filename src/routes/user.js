const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();

userRouter.get("/user/requests/recieved", userAuth, async(req,res) => {
    
    try {
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({recieverUserID: loggedInUser._id, status: "Interested"}).populate("senderUserID", ["firstName", "lastName", "about", "skills"]); 
        res.json({
            message : "Data Fetched Successfully",
            data : connectionRequest,
        });
    } catch (error) {
        res.status(400).send("Error : " + error.message)
    }


})


userRouter.get("/user/connections", userAuth, async(req,res) => {
    
    try {
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            $or : [
                {senderUserID : loggedInUser._id, status : "Accepted"},
                {recieverUserID : loggedInUser._id, status : "Accepted"}
            ]
        }).populate("senderUserID", ["firstName", "lastName", "about", "skills"]).populate("recieverUserID", ["firstName", "lastName", "about", "skills"])

        const data = connectionRequest.map((data) => {
            if(data.senderUserID._id.equals(loggedInUser._id)) return data.recieverUserID;
            else return data.senderUserID; 
        });
        res.json({
            message : "Data Fetched Successfully",
            data : data,
        });
    } catch (error) {
        res.status(400).send("Error : " + error.message)
    }


})

module.exports = userRouter;
