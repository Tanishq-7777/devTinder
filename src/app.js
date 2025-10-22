const express = require("express");
const app = express();

app.get('/user/:userid/:name', (req, res) => {
  console.log(req.params)
  res.send("This is the get api call");
});//write anything in place of * while calling this api.

app.listen(9999, () => {
  console.log("Server listing on port 9999.");
});