const { StatusCodes } = require('http-status-codes');
const loginService = require('../services/loginService');

const login = async (req, res, next) => {
    const { email, senha } = req.body;
    const token = await loginService.login(email, senha);

    if (token.error) { return next(token.error); }

    res.status(StatusCodes.OK).json({ token });
};

module.exports = {
    login,
  };