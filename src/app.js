const express = require("express");
const {connectDB} = require("./config/database");
const User  = require("./models/user")
const app = express();

//post API
app.post("/signup",async (req,res) => {
  const user = new User ({
    firstName : "Virat",
    lastName: "Kohli",
    email: "viratkohli@gmail.com",
    password : "virat@1988",
  });
  try{
    await user.save();
    res.send("User Data Saved Successfully.");
  }
  catch{
    res.status(400).send("ERROR 404");
  }
  
})



connectDB().then(() => {
    console.log("Db connected");
    app.listen(9999, () => {
    console.log("Server listing on port 9999.");
});
}).catch(err => {
    console.log("Err"); 
}) 
