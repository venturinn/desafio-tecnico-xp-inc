const { StatusCodes } = require('http-status-codes');
const accountsService = require('../services/accountsService');

const getAccountBalanceByClientId = async (req, res, next) => {
    const { id } = req.params;
    const accountBalance = await accountsService.getAccountBalanceByClientId(id);

    if (accountBalance.error) { return next(accountBalance.error); }

    res.status(StatusCodes.OK).json(accountBalance);
};
const makeAccountDeposit = async (req, res, next) => {
    const { CodCliente, Valor } = req.body;
    const newAccountBalance = await accountsService.makeAccountDeposit(CodCliente, Valor);

    if (newAccountBalance.error) { return next(newAccountBalance.error); }

    res.status(StatusCodes.OK).json(newAccountBalance);
};

const makeAccountWithdrawal = async (req, res, next) => {
    const { CodCliente, Valor } = req.body;
    const newAccountBalance = await accountsService.makeAccountWithdrawal(CodCliente, Valor);

    if (newAccountBalance.error) { return next(newAccountBalance.error); }

    res.status(StatusCodes.OK).json(newAccountBalance);
};

module.exports = {
    getAccountBalanceByClientId,
    makeAccountDeposit,
    makeAccountWithdrawal,
};