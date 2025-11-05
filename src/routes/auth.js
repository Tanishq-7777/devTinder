const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const express = require("express");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
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
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //Add the token and Cookie
      const token = await user.getJWT();
      res.cookie("token", token);

      res.send("LoggedIn Successfully...");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.send(err.message);
  }
});
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successfull");
});
module.exports = authRouter;
