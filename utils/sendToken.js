// Create the token and save in cookie
const jwt = require("jsonwebtoken");
const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  // const accesstoken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
  //   expiresIn: process.env.JWT_EXPIRE,
  // });
  // const accesstoken = "hello";
  // console.log("send_req.user", req.user);
  console.log("token ", token);
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
