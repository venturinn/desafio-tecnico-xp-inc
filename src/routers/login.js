const express = require('express');
require('express-async-errors');
const loginController = require('../controllers/loginController');
const { loginValidate } = require('../middlewares');

const loginRouter = express.Router();

loginRouter.post('/', loginValidate, loginController.login);

module.exports = loginRouter;