const express = require("express");
const { connectDB } = require("./config/database");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json()); //to convert the json data to js object for all api.
//post API
app.use(cookieParser()); //parsing cookies

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter); 

connectDB()
  .then(() => {
    console.log("Db connected");
    app.listen(9999, () => {
      console.log("Server listing on port 9999.");
    });
  })
  .catch((err) => {
    console.log("Err");
  });
