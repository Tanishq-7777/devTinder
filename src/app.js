const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");
const app = express();
app.use(express.json()); //to convert the json data to js object for all api.
//post API
app.use(cookieParser()); //parsing cookies
app.post("/signup", async (req, res) => {
  //Encrypt Your Password
  const { firstName, lastName, emailId, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  //Crete a instance of User Model.
  const user = new User({
    firstName,
    lastName,
    emailId,
    password: passwordHash,
  });
  const userSkillSet = Array.from(new Set(user.skills)); //REMOVING DUPLICATE SKILLS
  user.skills = userSkillSet;
  try {
    //Validation
    validateSignUpData(req);
    await user.save();
    res.send("User Data Saved Successfully.");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      //Add the token and Cookie
      const token = jwt.sign({ _id: user._id }, "DEV@TINDER$2025", {
        expiresIn: "1d",
      });
      res.cookie("token", token);

      res.send("LoggedIn Successfully...");
    } else {
      throw new Error("Invalid Credentialsv");
    }
  } catch (err) {
    res.send(err.message);
  }
});

//Profile API
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.send(err.message);
  }
});

//SendConnectionRequest
app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  res.send(user.firstName + " sent the connection request");
});

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
