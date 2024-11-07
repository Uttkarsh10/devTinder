const jwt = require("jsonwebtoken");
const User = require("../models/user");


const userAuth = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        const {token} = cookies;
    
        if(!token){
           throw new Error("Invalid Token");   
        }
    
        const decodedMessage = await jwt.verify(token, 'devTinder@10');
        const {_id} = decodedMessage
    
        const user = await User.findById(_id);
    
        if(!user) throw new Error("User Not found");
        req.user = user;
        next()

    } catch (error) {
        res.status(400).send("Error : " + error.message);
    }
}


module.exports = {
    userAuth
}