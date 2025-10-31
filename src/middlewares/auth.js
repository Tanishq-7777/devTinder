const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token Not Valid!!!!");
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
    res.send(err.message);
  }
};
module.exports = {
  userAuth,
};
