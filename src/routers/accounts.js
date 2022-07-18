const express = require('express');
require('express-async-errors');
const accountsController = require('../controllers/accountsController');
const { accountTransactionValidate } = require('../middlewares');

const accountsRouter = express.Router();

accountsRouter.get('/:id', accountsController.getAccountBalanceByClientId);

accountsRouter.post(
  '/deposito',
  accountTransactionValidate,
  accountsController.makeAccountDeposit,
);

accountsRouter.post(
  '/saque',
  accountTransactionValidate,
  accountsController.makeAccountWithdrawal,
);

module.exports = accountsRouter;
