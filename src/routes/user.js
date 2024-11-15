const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
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


userRouter.get("/feed", userAuth, async(req,res) => {
    try {
        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;

        const skip = (page-1)*limit;

        const connectionRequest = await ConnectionRequest.find({
            $or: [
                {recieverUserID : loggedInUser._id},
                {senderUserID : loggedInUser._id}  
            ]
        })

        //We only want those profile to whom we haven't sent, recieved the connection request
        const hideProfiles = new Set();
        connectionRequest.map((data) => {
            hideProfiles.add(data.recieverUserID.toString());
            hideProfiles.add(data.senderUserID.toString());
        });

        //Now for feed, we want those profiles who are not present in the hiddenProfiles and also our own profile should not be there, Hence the 2nd check.
        const feedProfiles = await User.find({
            $and : [
                {_id : {$nin : Array.from(hideProfiles)}},
                {_id : {$ne : loggedInUser._id}},
            ]
        }).select(["firstName", "lastName", "about", "skills"]).skip(skip).limit(limit);

        res.send(feedProfiles);

    } catch (error) {
        res.status(400).json({message : error.message});    
    }
})

module.exports = userRouter;
