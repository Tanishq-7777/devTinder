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
app.get("/user", async (req,res) => {
  try{
    const user = await User.find(req.body);//*To Find One Document
    if(!user.length ){
      res.status(404).send("invalid User")
    }
    else{
      res.send(user);
    }
    
  }
  catch(err) {
    res.send("User not found")
  }
})
app.get("/feed", async (req,res) => {
  try{
    //*To find all Document
    const user = await User.find({});
    if(!user.length ){
      res.status(404).send("invalid User")
    }
    else{
      res.send(user);
    }
    
  }
  catch(err) {
    res.send("User not found")
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
