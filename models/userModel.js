const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const { validate } = require("./tourModel");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a user-name']
    },
    email: {
        type: String,
        unique: true,
        lowercase:true,
        required: [true, 'Please provide an email-address'],
        // validate: [validator.isEmail, 'Please provide a valid email-address']
    },
    photo: String,
    role:{
        type:String,
        default: "user"
    },
    password:{
        type: String,
        required: [true, 'Please provide a password'],
        minlength: true,
        // select: false
    },
    passwordConfirm:{
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            //only workson create and save
            validator: function(el){
                return el === this.password
            },
            message: 'Passwords are not same'
        }

    }

});

userSchema.pre('save', async function (next){
    if(!this.isModified('password')) return next();
    //hasing the password below with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    //delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;