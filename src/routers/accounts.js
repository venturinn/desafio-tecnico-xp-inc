const express = require('express');
require('express-async-errors');
const accountsController = require('../controllers/accountsController');

const accountsRouter = express.Router();

accountsRouter.get('/:id', accountsController.getAccountBalanceByClientId);
accountsRouter.post('/deposito', accountsController.makeAccountDeposit);
accountsRouter.post('/saque', accountsController.makeAccountWithdrawal);

module.exports = accountsRouter;
