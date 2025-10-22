const express = require("express");
const app = express();
app.get("/user",(req,res) => {
  res.send({firstname:"Tanishq",lastname:"Saxena"})
})
app.post("/user",(req,res) => {
  res.send("user data is sent successfully.");
})
app.delete("/user",(req,res) => {
  res.send("user data is deleted successfully.")
})
app.patch("/user",(req,res) => {
  res.send("user data is updated successfully.")
})
app.listen(9999, () => {
  console.log("Server listing on port 9999.");
});
