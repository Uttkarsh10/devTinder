 const express =  require("express");
 
 const app = express();
 
 app.use("/", (req,res) => {
    res.send("Default Page!!");
 })
 
 app.use("/test", (req,res) => {
    res.send("My Server on test page");
 })



 app.listen(3000, () => {
    console.log("App is running successfully on port 3000");
 })
