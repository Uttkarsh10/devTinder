 const express =  require("express");
 
 const app = express();

 const {connectDB} = require("./config/database")
 const {adminAuth} = require("./middlewares/auth")
 const User = require("./models/user");
 const {validateSignUpData} = require("./utils/validation")


app.use(express.json());

app.post("/signup", async (req,res) => {

   //Validation of data
   validateSignUpData(req);

   const user = new User(req.body);
   // const user = new User({
   //    firstName : "Tary",
   //    lastName : "Saini",
   //    email : "Taru@gmail.com",
   //    password : "Taru@123",
   // });

   try{
      await user.save();
      res.send("User Added Successfully");
   } catch(err){
      res.status(400).send("Error Sending the user data" + err.message);
   }
})

app.get("/user", async (req,res) => {

   const email = req.body.email;
   
   try{
      // console.log(email);
      // const Users = await User.find({email:email});
      const Users = await User.find({});
      res.send(Users);
   }

   catch(err){
      res.status(400).send("Error Sending the user data" + err.message);
   }
});

app.patch("/user/:userId", async (req,res) => {
   const userId = req?.params.userId;
   const data = req.body;
   // const name = req.body.firstname;

   try{
      const ALLOW_UPDATES = ["About", "Gender", "Skills"];
      const isUpdateAllowed = Object.keys(data).every((k) => ALLOW_UPDATES.includes(k));

      if(!isUpdateAllowed) {throw new Error("Update not Allowed");}

      if(data?.skills.length>10){throw new Error("Skills Cannot be more then 10")}

      const updatedUser = await User.findOneAndUpdate({_id:userId}, data, {runValidators:true,});
      // const updatedUser = await User.findOneAndUpdate({firstName:name}, {firstName:"Taru"})
      console.log(updatedUser);
      res.send("User Updated");
   }
   catch(err){
      res.status(400).send("Error Sending the user data" + err.message);
   }
});

app.delete("/user", async(req,res) => {

   // const name = req.body.firstname;
   const id = req.body.id;
   
   try{
      // console.log(name);
      // const deletedUser = await User.deleteOne({firstName:name});
      const deletedUser = await User.findByIdAndDelete(id);
      
      res.send(deletedUser);
   }

   catch(err){
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



