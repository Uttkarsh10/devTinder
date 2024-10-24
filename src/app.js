 const express =  require("express");
 
 const app = express();

 const {adminAuth} = require("./middlewares/auth")
 
//  app.use("/admin", (req, res, next) => 
//    {
//       const token = "Abcdds";
//       const authorized = token === "Abc";
      
//       if(authorized){
//          next();
//       }

//       else {res.status(401).send("Unauthorized Access");}
//    }
// );
app.use("/admin", adminAuth);


 app.get("/admin", (req, res) => 
   {
      res.send("Data Sent Successfully"); 
   }
);


 app.listen(3000, () => {
    console.log("App is running successfully on port 3000");
 })
