const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const sendToken = require("../utils/sendToken");

const signup = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  if (!username || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const userAvailable = await User.findOne({ username });
  if (userAvailable) {
    res.status(400);
    throw new Error("user already registered!");
  }
  // console.log("userAvailable ", userAvailable);
  const user = await User.create({
    username,
    password,
  });
  console.log("user", user);
  sendToken(user, 201, res);
});

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("All fields need to be entered");
  }
  const user = await User.findOne({ username });
  console.log("user ", user);
  if (user && (await user.comparePassword(password))) {
    sendToken(user, 200, res);
  } else {
    res.status(400);
    throw new Error("email or password is not valid");
  }
});

const logout = asyncHandler(async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Log Out",
  });
});

module.exports = { signup, login, logout };
