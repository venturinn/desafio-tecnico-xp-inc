const { StatusCodes } = require('http-status-codes');
const Joi = require('joi');

module.exports = (req, res, next) => {
  const { email, senha } = req.body;
  const { error } = Joi.object({
    email: Joi.string().email().required(),
    senha: Joi.required(),
  }).validate({ email, senha });

  if (error) {
    return res.status(StatusCodes.BAD_REQUEST)
    .json({ message: 'Some required fields are missing' });
  }
  
  next();
};