const express = require('express');
const requestRouter = express.Router()

const {userAuth} = require("../middlewares/auth")

requestRouter.post("/sendConnectionRequest", userAuth, async(req,res) => {

    try {
       console.log("connection request")
       res.send("Connection Request Sent")
    } catch (error) {
       res.status(400).send("Error : " + err);
    }
 })

module.exports = requestRouter;