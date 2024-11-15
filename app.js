// const momgoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
require('dotenv').config({path:'./config.env'});

const { default: mongoose } = require('mongoose');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const stripeRouter = require('./routes/stripeRoutes');
const paypalRouter = require('./routes/paypalRoutes');
const { sendEmail } = require('./utils/brevo');
const brevoRouter = require('./routes/brevoRoute');
const forgetPasswordRouter = require('./routes/forgetPasswordRoute');
const updatePasswordRouter = require('./routes/updatePasswordRouter');

const app = express();
// momgoose.connect(process.env.DB, {
//     useNewUrlParser: true
// })
// .then(con => {
//     console.log(con.connections);
//     console.log('DB connection successful')
// })
// .catch(err => console.log(err))

// const tourSchema = new mongoose.Schema({
//     name:{
//         type: String,
//         required: [true, 'A tour must have a name']
//     },
//     rating: {
//         type: Number,
//         default: 4.5
//     },
//     price: {
//         type: String,
//         required: [true, 'A tour must have a price']
//     }
// })


if (process.env.NODE_ENV == 'development') {
    console.log("we are in development mode");
    app.use(morgan('dev'))
}else{
    console.log("we are in production mode")
}

app.use(express.json());
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/stripe', stripeRouter);
app.use('/api/v1/paypal', paypalRouter);
// app.use('/api/v1/mail', brevoRouter)
app.use('/api/v1/forget-password', forgetPasswordRouter)
app.use('/api/v1/update-password', updatePasswordRouter)

module.exports = app;
