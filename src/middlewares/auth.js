const adminAuth = (req, res, next) => 
    {
       const token = "Abc";
       const authorized = token === "Abc";
       
       if(authorized){
          next();
       }
 
       else {res.status(401).send("Unauthorized Access");}
    }


module.exports = {
    adminAuth
}