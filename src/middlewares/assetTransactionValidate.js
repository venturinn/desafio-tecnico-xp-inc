const { StatusCodes } = require('http-status-codes');
const Joi = require('joi');

module.exports = (req, _res, next) => {
  const { codCliente, codAtivo, qtdeAtivo } = req.body;
  const { error } = Joi.object({
    codCliente: Joi.number().strict().integer().required(),
    codAtivo: Joi.number().strict().integer().required(),
    qtdeAtivo: Joi.number().strict().integer().min(1)
.required(),
  }).validate({ codCliente, codAtivo, qtdeAtivo });

  if (error) {
    return next({
      code: StatusCodes.BAD_REQUEST,
      message: error.details[0].message,
    });
  }

  return next();
};
