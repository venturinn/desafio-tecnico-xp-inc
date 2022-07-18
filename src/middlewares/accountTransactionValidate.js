const { StatusCodes } = require('http-status-codes');
const Joi = require('joi');

module.exports = (req, _res, next) => {
  const { CodCliente, Valor } = req.body;
  const { error } = Joi.object({
    CodCliente: Joi.number().strict().integer().required(),
    Valor: Joi.number().strict().min(0.01).precision(2)
.required(),
  }).validate({ CodCliente, Valor });

  if (error) {
    return next({
      code: StatusCodes.BAD_REQUEST,
      message: error.details[0].message,
    });
  }

  return next();
};
