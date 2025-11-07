const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/database");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const { userRouter } = require("./routes/user");

const app = express();

// ✅ Middlewares (order matters)
app.use(express.json());
app.use(cookieParser());

// ✅ Fix CORS (must be ABOVE all routes)
const allowedOrigins = [
  "http://localhost:5173", // Local React dev
  "https://devtinder-frontend.vercel.app", // 🚀 Your Vercel frontend URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman & non-browser tools
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // ✅ Allows cookies
  })
);

// ✅ Routes (after CORS)
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// ✅ DB + Server
const PORT = process.env.PORT || 9999;

connectDB()
  .then(() => {
    console.log("✅ Database connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed", err);
  });
