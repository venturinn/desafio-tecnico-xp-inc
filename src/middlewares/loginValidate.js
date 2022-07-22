const Joi = require('joi');
const { loginvalidateError } = require('../utils/errors');

module.exports = (req, _res, next) => {
  const { email, senha } = req.body;
  const { error } = Joi.object({
    email: Joi.string().email().required(),
    senha: Joi.string().required(),
  }).validate({ email, senha });

  if (error) {
    return next(loginvalidateError);
  }
  
  next();
};