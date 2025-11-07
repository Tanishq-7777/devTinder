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
const allowedOrigins = [
  "http://localhost:5173", // for local development
  "https://your-frontend-name.vercel.app", // your live Vercel frontend URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
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
