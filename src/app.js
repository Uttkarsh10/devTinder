 const express =  require("express");
 
 const app = express();

 const {connectDB} = require("./config/database")
//  const {userAuth} = require("./middlewares/auth")
//  const User = require("./models/user");
//  const {validateSignUpData} = require("./utils/validation")
//  const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
//  const jwt = require("jsonwebtoken")


app.use(express.json());
app.use(cookieParser())


const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);


// app.post("/signup", async (req,res) => {

//    try{
      
//       //Validation of data
//       validateSignUpData(req);

//       const {firstName, lastName, email, password} = req.body;
//       // Encrypt the password
//       const passwordHash = await bcrypt.hash(password, 10);

//       const user = new User({firstName, lastName, email, password : passwordHash});
//    // const user = new User({
//    //    firstName : "Tary",
//    //    lastName : "Saini",
//    //    email : "Taru@gmail.com",
//    //    password : "Taru@123",
//    // });

//       await user.save();
//       res.send("User Added Successfully");

//    } catch(err){
//       res.status(400).send("Error : " + err.message);
//    }
// })


// app.post("/login", async (req,res) => {

//    try{
      
//       const {email, password} = req.body;
//       const user = await User.findOne({email:email});

//       if(!user) {throw new Error("Invalid Credentials");}

//       // const isPasswordValid = await bcrypt.compare(password, user.password);
//       const isPasswordValid = await user.validatePassword(password);

//       if(isPasswordValid) {

//          //Create a jwt token
//          // const token = await jwt.sign({_id:user._id}, "devTinder@10", {expiresIn: "7d"});
//          const token = await user.getJWT();
//          console.log(token);

//          res.cookie("token" , token, {expires: new Date(Date.now() + 8*3600000)});
//          res.send("Login Successfull");
//       }

//       else {throw new Error("Invalid Credentials");}

//    } catch(err){
//       res.status(400).send("Error : " + err);
//    }
// })

// app.get("/profile", userAuth, async(req,res) => {

//    try {
//       const user = req.user;
//       res.send(user)
//    } catch (error) {
//       res.status(400).send("Error : " + err);
//    }
// })


// app.post("/sendConnectionRequest", userAuth, async(req,res) => {

//    try {
//       console.log("connection request")
//       res.send("Connection Request Sent")
//    } catch (error) {
//       res.status(400).send("Error : " + err);
//    }
// })



connectDB()
 .then(() => {
   console.log("Database Connected");
   app.listen(3000, () => {
      console.log("App is running successfully on port 3000");
   });
 })
 .catch((err) => {console.error("Error in database connection");});












































































// app.get("/user", async (req,res) => {

//    const email = req.body.email;
   
//    try{
//       // console.log(email);
//       // const Users = await User.find({email:email});
//       const Users = await User.find({});
//       res.send(Users);
//    }

//    catch(err){
//       res.status(400).send("Error Sending the user data" + err.message);
//    }
// });

// app.patch("/user/:userId", async (req,res) => {
//    const userId = req?.params.userId;
//    const data = req.body;
//    // const name = req.body.firstname;

//    try{
//       const ALLOW_UPDATES = ["About", "Gender", "Skills"];
//       const isUpdateAllowed = Object.keys(data).every((k) => ALLOW_UPDATES.includes(k));

//       if(!isUpdateAllowed) {throw new Error("Update not Allowed");}

//       if(data?.skills.length>10){throw new Error("Skills Cannot be more then 10")}

//       const updatedUser = await User.findOneAndUpdate({_id:userId}, data, {runValidators:true,});
//       // const updatedUser = await User.findOneAndUpdate({firstName:name}, {firstName:"Taru"})
//       console.log(updatedUser);
//       res.send("User Updated");
//    }
//    catch(err){
//       res.status(400).send("Error Sending the user data" + err.message);
//    }
// });

// app.delete("/user", async(req,res) => {

//    // const name = req.body.firstname;
//    const id = req.body.id;
   
//    try{
//       // console.log(name);
//       // const deletedUser = await User.deleteOne({firstName:name});
//       const deletedUser = await User.findByIdAndDelete(id);
      
//       res.send(deletedUser);
//    }

//    catch(err){
//       res.status(400).send("Error Sending the user data" + err.message);
//    }
// })




