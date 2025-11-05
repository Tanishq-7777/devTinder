const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.send(err.message);
  }
});
profileRouter.get("/profile/edit", userAuth, (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const user = req.user;
    Object.keys(req.body).forEach((field) => {
      user[field] = req.body[field];
    });
    user.save();
    res.send(`${user.firstName} Data Edited Successfully`);
  } catch (err) {
    res.send("Error : ", err.message);
  }
});

profileRouter.post("/profile/password", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const { password, newPass } = req.body;
    const isPassValid = await bcrypt.compare(password, user.password);
    if (!isPassValid) {
      throw new Error("Password not Valid");
    } else {
      const newPasswordHash = await bcrypt.hash(newPass, 10);
      const newuser = await User.findByIdAndUpdate(user._id, {
        password: newPasswordHash,
      });
      res.cookie("token", null, {
        expires: new Date(Date.now()),
      });
      res.send("Password Updated");
    }
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = profileRouter;
