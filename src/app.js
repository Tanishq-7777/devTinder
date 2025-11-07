const express = require("express");
const { connectDB } = require("./config/database");
const cors = require("cors");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userRouter } = require("./routes/user");

const app = express();

app.use(express.json()); //to convert the json data to js object for all api.
//post API
const PORT = process.env.PORT || 9999;
app.use(cookieParser()); //parsing cookies
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Db connected");
    app.listen(PORT, () => {
      console.log("Server listing.");
    });
  })
  .catch((err) => {
    console.log("Err");
  });
