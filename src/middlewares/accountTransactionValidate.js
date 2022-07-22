const { StatusCodes } = require('http-status-codes');
const Joi = require('joi');

module.exports = (req, _res, next) => {
  const { codCliente, valor } = req.body;
  const { error } = Joi.object({
    codCliente: Joi.number().strict().integer().required(),
    valor: Joi.number().strict().min(0.01).precision(2)
.required(),
  }).validate({ codCliente, valor });

  if (error) {
    return next({
      code: StatusCodes.BAD_REQUEST,
      message: error.details[0].message,
    });
  }

  return next();
};
