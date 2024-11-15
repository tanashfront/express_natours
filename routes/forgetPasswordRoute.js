const express = require('express');
const { forgetPassword } = require('../controllers/forgetPassword');


const forgetPasswordRouter = express.Router();

forgetPasswordRouter.route('/')
.post(forgetPassword);


module.exports = forgetPasswordRouter;