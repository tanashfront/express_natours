const express = require('express');
const { getUsers, createUser, getUser, updateUser, deleteUser } = require('../controllers/userController');
const { signup, login } = require('../controllers/authController');
const { protect } = require('../middlewares/protect');

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);

userRouter.route('/')
.get(getUsers)
.post(createUser)

userRouter.route('/:id')
.get(getUser)
.put(updateUser)
.delete(deleteUser)

module.exports = userRouter;