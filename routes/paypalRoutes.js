const express = require('express');
const { paypalCreate, paypalExecute } = require('../controllers/paypalController');
// const { paypalPayment } = require('../controllers/paypalController');
// const { paypalPayment } = require('../controllers/stripeController');

const paypalRouter = express.Router();

paypalRouter.route('/create')
.post(paypalCreate);

paypalRouter.route('/execute')
.get(paypalExecute);

module.exports = paypalRouter;