const express = require('express');
const { getTours, postTour, getTour, updateTour, deleteTour} = require('../controllers/tourController');
const { protect } = require('../middlewares/protect');
// const { checkID, checkNamePrice } = require('../middlewares/tourMiddleware');
// const tours = require('../data/tours-simple.json')

const tourRouter = express.Router();

tourRouter.route('/')
.get(getTours)
.post(protect, postTour);


tourRouter.route('/:id')
.get(getTour)
.put(protect, updateTour)
.delete(protect, deleteTour);

module.exports = tourRouter;