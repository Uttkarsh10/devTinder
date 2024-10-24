const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://uttkarshsaini10:VYP8hu5UXCXHpoyW@cluster0.q4s5j.mongodb.net/devTinder");
};


module.exports = {connectDB}


// ?retryWrites=true&w=majority&appName=Cluster0/