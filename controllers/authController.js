const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { catchAsync, handleError } = require("../utils/error");

exports.signup = catchAsync(async (req, res, next) => {
  // const {name, email, password, passwordConfirm} = req.body;
  const { name, email, role, password, passwordConfirm } = req.body;
  if (!name || !email || !password || !passwordConfirm) {
    return handleError(
      res,
      400,
      "fail",
      "one or more important fields have been left blank"
    );
  }
  const newUser = await User.create({
    name: name,
    email: email,
    role: role, 
    password: password,
    passwordConfirm: passwordConfirm,
  });
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  res.status(201).json({
    status: "success",
    token,
    user: jwt.decode(token),
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return handleError(
      res,
      400,
      "fail",
      "email or password or both left blank"
    );
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    return handleError(res, 404, "fail", "Email didn't match")
  }
  console.log(user.password);
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    res.status(200).json({
      status: "success",
      token,
      user: jwt.decode(token),
    });
    next();
    return;
  }
  return handleError(res, 400, "fail", "password isn't correct");
});
