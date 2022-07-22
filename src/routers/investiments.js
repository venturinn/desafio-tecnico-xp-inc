const express = require('express');
require('express-async-errors');
const investmentsController = require('../controllers/investmentsController');
const {
  assetTransactionValidate,
  authenticationValidate,
  authorizationValidate,
} = require('../middlewares');

const investmentsRouter = express.Router();

investmentsRouter.post(
  '/comprar',
  authenticationValidate,
  assetTransactionValidate,
  authorizationValidate,
  investmentsController.buyAsset,
);

investmentsRouter.post(
  '/vender',
  authenticationValidate,
  assetTransactionValidate,
  authorizationValidate,
  investmentsController.sellAsset,
);

module.exports = investmentsRouter;
