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
    res.status(400).send(err.message);
  }
});
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const user = req.user;
    Object.keys(req.body).forEach((field) => {
      user[field] = req.body[field];
    });
    await user.save();
    res.json({ message: "Profile Updated Successfully", data: user });
  } catch (err) {
    res.status(401).send("Error : " + err.message);
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
      res.cookie("token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(0),
      });
      res.send("Password Updated");
    }
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = profileRouter;
