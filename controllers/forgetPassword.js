const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { handleError } = require("../utils/error");
const { sendEmail } = require("../utils/brevo");

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return handleError(res, 404, "fail", "User doesn't exist");
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
//   res.status(200).json({
//     message: "forgotten",
//     user: jwt.decode(token),
//   });
  try {
    await sendEmail(
      email,
      "Reset Password",
      `http://localhost:8000/api/v1/update-password?token=${token}`,
      `<strong>http://localhost:8000/api/v1/update-password?token=${token}</strong>`
    );
    res.status(200).json({
        message:"Email sent successfully!"
    });
  } catch (err) {
    res.status(500).json({
      message: "Error sending mail!",
    });
  }
};
