const express = require('express');
const requestRouter = express.Router()

const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');

requestRouter.post("/request/send/:status/:recieverUserId", userAuth, async(req,res) => {
    try {
        const recieverUserID = req.params.recieverUserId;
        const senderUserID = req.user._id;
        const status = req.params.status;

        console.log(senderUserID);
        console.log(recieverUserID);

        const allowedStatus = ["Ignored", "Interested"];
        if(!allowedStatus.includes(status)) {return res.status(400).json({message : "Invalid Status Type : " + status})}

        const recieverUser = await User.findById(recieverUserID);
        if(!recieverUser) {return res.status(400).json({message : "User not found"})}

        const validConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                {recieverUserID, senderUserID},                                  // This is the check for repeating the connection request
                {recieverUserID : senderUserID, senderUserID : recieverUserID},  // This is thre check for reverse connection request
            ]
        })


        //explore this for $or and similar operator https://www.mongodb.com/docs/manual/reference/operator/query-logical/

        //if either of the above checks are true, we should send back an error response
        if(validConnectionRequest) {return res.status(400).json({message : "This connection request already exists."})}
        
        const connectionRequest = new ConnectionRequest({recieverUserID, senderUserID, status});

        const data = await connectionRequest.save();

        res.json({
            message : "Connection Request Sent Successfully",
            data,
        });
    } catch (error) {
       res.status(400).send("Error : " + error);
    }
 })


 requestRouter.post("/request/review/:status/:requestId", userAuth, async(req,res) => {
    try {

        const loggedInUser = req.user;
        const status = req.params.status;
        const requestId = req.params.requestId;

        const allowedStatus = ["Accepted", "Rejected"];
        if(!allowedStatus.includes(status)) {throw new Error("Invalid Status Type");   }

        const connectionRequest = await ConnectionRequest.findOne({
            _id : requestId,
            recieverUserID : loggedInUser._id,
            status : "Interested",
        })

        if(!connectionRequest) {return res.status(400).json({message : "Connection Request not found"})}

        connectionRequest.status = status;
        const data = await connectionRequest.save();
        res.json({message : `Connection Request ${status}`, data});

    } catch (error) {
        res.status(400).send("Error : " + error);
    }
 })





module.exports = requestRouter;