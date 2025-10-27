const express = require("express");
const {connectDB} = require("./config/database");
const User  = require("./models/user")
const app = express();
app.use(express.json());//to convert the json data to js object for all api.
//post API
app.post("/signup",async (req,res) => {
  const user = new User(req.body);
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
