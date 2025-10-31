const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
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
      const token = jwt.sign({ _id: user._id }, "DEV@TINDER$2025");
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
app.get("/profile", async (req, res) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("Token is not valid");
    }
    const decodedMessage = jwt.verify(token, "DEV@TINDER$2025");
    const { _id } = decodedMessage;

    const user = await User.findById({ _id });
    if (!user) {
      throw new Error("User is not present");
    }
    res.send(user);
  } catch (err) {
    res.send(err.message);
  }
});

app.get("/user", async (req, res) => {
  try {
    const user = await User.find(req.body); //*To Find One Document
    if (!user.length) {
      res.status(404).send("invalid User");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.send("User not found");
  }
});
app.get("/feed", async (req, res) => {
  try {
    //*To find all Document
    const user = await User.find({});
    if (!user.length) {
      res.status(404).send("invalid User");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.send("User not found");
  }
});
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  await User.findByIdAndDelete(userId);
  res.send("Deleted");
});
//Update Data of the User.
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "skills"];
    const isUpdatedAllowed = Object.keys(data).every((k) => {
      return ALLOWED_UPDATES.includes(k);
    });
    const set = new Set(data.skills);
    data.skills = Array.from(set);

    if (!isUpdatedAllowed) {
      throw new Error("This Data Can not Be Updated");
    }
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("Updated");
  } catch (err) {
    res.send("Error 404");
  }
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
