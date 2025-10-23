const express = require("express");
const app = express();
//why we need middlewares --> for api authentication  
//1 way -> but not a good way as you need to check auhth everytime that that is cost comsuming.
// app.get("/user/getData",(req,res) => {
//   let accessToken = true;
//   if(accessToken){
//     res.send("You are an authenticated user to get data.");
//   }
//   else{
//     res.status(401).send("You are not an authenticated user to get data.");
//   }
// })  
// app.get("/user/deleteData",(req,res) => {
//   let accessToken = false;
//   if(accessToken){
//     res.send("You are an authenticated user to delete data.");
//   }
//   else{
//     res.status(401).send("You are not an authenticated user to delete data.");
//   }
// })
//2 way -> good way as check suth 1 time .
const {authUser} = require("./middlewares/auth")
app.use("/user",authUser)
app.get("/user/getUser",(req,res) => {
  res.send("Getting the user data...");
})
app.get("/user/deleteUser",(req,res) => {
  res.send("Deleting the user data...");
})

app.listen(9999, () => {
  console.log("Server listing on port 9999.");
});