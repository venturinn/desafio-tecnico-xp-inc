const { StatusCodes } = require('http-status-codes');
const investmentsService = require('../services/investmentsService');

const buyAsset = async (req, res, next) => {
  const { codCliente, codAtivo, qtdeAtivo } = req.body;
  const buyResult = await investmentsService.buyAsset(codCliente, codAtivo, qtdeAtivo);

  if (buyResult.error) { return next(buyResult.error); }

  res.status(StatusCodes.OK).json(buyResult);
};

module.exports = {
    buyAsset,
};