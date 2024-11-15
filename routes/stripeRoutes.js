const express = require('express');
const { stripePayment } = require('../controllers/stripeController');

const stripeRouter = express.Router();

stripeRouter.route('/')
.post(stripePayment);

module.exports = stripeRouter;