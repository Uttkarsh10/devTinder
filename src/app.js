 const express =  require("express");
 
 const app = express();

 const {connectDB} = require("./config/database")
 const {adminAuth} = require("./middlewares/auth")
 const User = require("./models/user");

app.post("/signup", async (req,res) => {

   const user = new User({
      firstName : "Tary",
      lastName : "Saini",
      email : "Taru@gmail.com",
      password : "Taru@123",
   });

   try{
      await user.save();
      res.send("User Added Successfully");
   } catch(err){
      res.status(400).send("Error Sending the user data" + err.message);
   }
})

connectDB()
 .then(() => {
   console.log("Database Connected");
   app.listen(3000, () => {
      console.log("App is running successfully on port 3000");
   });
 })
 .catch((err) => {console.error("Error in database connection");});



