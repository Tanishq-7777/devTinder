const express = require("express");
const {connectDB} = require("./config/database");
const User  = require("./models/user")
const app = express();
app.use(express.json());//to convert the json data to js object for all api.
//post API
app.post("/signup",async (req,res) => {
  const user = new User(req.body);
  const userSkillSet = Array.from(new Set(user.skills))
  user.skills = userSkillSet;
  try{
    await user.save();
    res.send("User Data Saved Successfully.");
  }
  catch(err){
    res.status(400).send(err.message);
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
app.delete("/user", async(req,res) => {
  const userId = req.body.userId;
  await User.findByIdAndDelete(userId);
  res.send("Deleted")
})
//Update Data of the User.
app.patch("/user/:userId",async(req,res) => {
  const userId = req.params?.userId;
  const data  = req.body;
  
  try{
    const ALLOWED_UPDATES = ["photoUrl","about","skills"]
    const isUpdatedAllowed  = Object.keys(data).every((k) => {
      return ALLOWED_UPDATES.includes(k);
    });
    const set = new Set(data.skills);
    data.skills = Array.from(set);
    
    if(!isUpdatedAllowed){
     throw new Error("This Data Can not Be Updated")
    }
    const user = await User.findByIdAndUpdate(userId,data,{
      returnDocument:"after",
      runValidators:true,
    });
    console.log(user);
    res.send("Updated")
  }
  catch(err){
    res.send("Error 404")
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
