const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { catchAsync } = require('../utils/error');

exports.updatePassword = catchAsync(async(req, res) => {
    const {password} = req.body;
    const {token} = req.query;
    console.log('token ' + token);
    const decoded = jwt.decode(token);
    const {id} = decoded;

    // const user = await User.findOne({_id:id});
    // user.
    const user = await User.findById(id);
    if (!user) {
        return handleError(res, 404, "fail", "User didn't match")
    }
    //After salah
    // user.password = await bcrypt.hash(password, 12);
    user.password = password;
    user.passwordConfirm = user.password;

    await user.save();
    return res.status(200).json({
        status: "success",
        user: user,
      });

});