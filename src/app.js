const express = require("express");
const app = express();

app.use("/user",(req,res,next) => {
  //do not send anything. --> will fall browser to infinite loop.
  console.log("Logged Item of Response 1");
  next();
},(req,res,next) => {
  console.log("Logged Item of Response 2");
  next();
})

app.listen(9999, () => {
  console.log("Server listing on port 9999.");
});