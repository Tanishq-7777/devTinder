const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      res.status(401).send("Please Login!");
    }
    const decodedObj = jwt.verify(token, "DEV@TINDER$2025");
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not Found!!!!");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send(err.message);
  }
};
module.exports = {
  userAuth,
};
