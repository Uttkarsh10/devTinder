const express = require('express')
const {validateEditProfileData} = require("../utils/validation")

const profileRouter = express.Router()

const {userAuth} = require("../middlewares/auth")

profileRouter.get("/profile", userAuth, async(req,res) => {

    try {
       const user = req.user;
       res.send(user)
    } catch (error) {
       res.status(400).send("Error : " + err);
    }
 })

 profileRouter.patch("/profile/edit", userAuth, async (req, res) => {

    try {
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit Request");
        }

        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
        await loggedInUser.save();
        // res.send(`${loggedInUser.firstName}, your profile updated successfully`);
        res.json({
            "Message" : `${loggedInUser.firstName}, your profile updated successfully`,
            "Data" : loggedInUser
        })

    } catch (error) {
        res.status(400).send("Error : " + error);
    }
 })


 //Add a password edit api, Also try to set a time frequency (say user should get password update reminder every 6 months)


 module.exports = profileRouter;