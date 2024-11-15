const express = require('express');
const { sendEmail } = require('../utils/brevo');


const brevoRouter = express.Router();
    

brevoRouter.route('/')
.post(async (req, res) => {
  try {
    await sendEmail(
      'tanvirashraf@ymail.com',
      'Welcome to Our Service!',
      'Thank you for signing up.',
      '<strong>I hope you are fine</strong>'
    )
    res.status(200).json({
      message:"Email sent successfully!"
    })
  } catch (error) {
    res.status(500).json({
      message:"Error sending mail!"
    })
  }
});
  
module.exports = brevoRouter;