const jwt = require("jsonwebtoken");
const { catchAsync, handleError } = require("../utils/error");
const User = require("../models/userModel");

exports.protect = catchAsync(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        if (err.name == "TokenExpiredError") {
          return handleError(res, 401, "fail", "token has expired!");
        }
      }
    });
    const { id } = jwt.decode(token);
    // isVerified = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({ _id: id });
    // console.log("token: "+ token, " id: "+ id, " user " + user);
    const { role } = user;
    if (role == "admin") {
      next();
      return;
    }
    if (!user || role !== "admin") {
      return handleError(res, 401, "fail", "you are not authroized");
    }
  }
});
