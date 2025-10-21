const express = require("express");
const app = express();
app.use("/test", (req, res) => {
  res.send("Namaste");
});
app.use("/hello", (req, res) => {
  res.send("Namaste on Your request.");
});
app.listen(9999, () => {
  console.log("Server listing on port 9999.");
});
