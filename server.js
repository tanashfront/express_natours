const mongoose = require('mongoose');
// const Tour = require('./models/tourModel');
const app = require("./app");
const User = require('./models/userModel');
// const sendEmail = require('./utils/brevo');
// const sendEmail = require('./utils/brevo');


const DB = process.env.DB.replace('<db_password>', process.env.DB_PASSWORD)
mongoose.connect(DB, {
    useNewUrlParser: true
})
.then(con => {
    // console.log(con.connections);
    console.log('DB connection successful')
})
.catch(err => console.log(err))


// const testTour = new Tour({
//     name: 'The Rodeo',
//     rating: 4.5,
//     price: 325
// });

// testTour
// .save()
// .then(doc => console.log(doc))
// .catch(err => console.log(err))
// console.log(process.env)
// console.log(process.env.PASSWORD)

// const testUser = new User({
//     name: 'test user',
//     email:'test@mail.com',
//     password: '12345678',
//     passwordConfirm: '12345678',
// });

// testUser
// .save()
// .then(doc => console.log(doc))
// .catch(err => console.log(err));

// sendEmail(
//     'recipient@example.com',
//     'Welcome to Our Service!',
//     'Thank you for signing up.',
//     '<strong>Thank you for signing up.</strong>'
//   );


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`listening to ${port}`)
});