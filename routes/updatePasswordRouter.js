const express = require('express');
const { updatePassword } = require('../controllers/updatePassword');

// const { paypalPayment } = require('../controllers/paypalController');
// const { paypalPayment } = require('../controllers/stripeController');

const updatePasswordRouter = express.Router();

updatePasswordRouter.route('/')
.put(updatePassword);


module.exports = updatePasswordRouter;