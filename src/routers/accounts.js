const express = require('express');
require('express-async-errors');
const accountsController = require('../controllers/accountsController');
const {
  accountTransactionValidate,
  authenticationValidate,
  authorizationValidate,
} = require('../middlewares');

const accountsRouter = express.Router();

accountsRouter.get(
  '/:id',
  authenticationValidate,
  accountsController.getAccountBalanceByClientId,
);
accountsRouter.get(
  '/ativos/:id',
  authenticationValidate,
  accountsController.getPortfolioByClientId,
);

accountsRouter.post(
  '/deposito',
  authenticationValidate,
  accountTransactionValidate,
  authorizationValidate,
  accountsController.makeAccountDeposit,
);

accountsRouter.post(
  '/saque',
  authenticationValidate,
  accountTransactionValidate,
  authorizationValidate,
  accountsController.makeAccountWithdrawal,
);

module.exports = accountsRouter;
