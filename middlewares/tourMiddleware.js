const express = require('express');
// const tourRouter = require('../routes/tourRoutes');
const tours = require('../data/tours-simple.json')

// const tourRouter = express.Router();
// exports.checkID = (req, res, next, val) => {
//     if (val > tours[tours.length - 1].id) {
//         return res.status(404).json({
//             "status":"failed",
//             "message":"Invalid Id"
//         });
//     }
//     // console.log("val: " + val)
//     next()
// };

// exports.checkNamePrice = (req, res, next) => {
//     const {name, price} = req.body;
//     console.log(name,price)
//     if (!name || !price) {
//         return res.status(400).json({
//             "status":"failed",
//             "message":"Invalid request"
//         });
//     }
//     next();
// }