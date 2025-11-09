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
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman, server-side)
      if (!origin) return callback(null, true);

      // Allow local development
      if (origin === "http://localhost:5173") {
        return callback(null, true);
      }

      // ✅ Dynamically allow all your Vercel deployments
      if (origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      // ❌ Block everything else
      console.log("❌ Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// const PORT = process.env.PORT || 9999;
const PORT = 9999;

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
