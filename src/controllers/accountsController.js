const { StatusCodes } = require('http-status-codes');
const accountsService = require('../services/accountsService');

const nonexistentClientError = {
    code: StatusCodes.NOT_FOUND,
    message: 'Client does not exist',
};
const getAccountBalanceByClientId = async (req, res, next) => {
    const { id } = req.params;
    const accountBalance = await accountsService.getAccountBalanceByClientId(id);

   if (!accountBalance) { return next(nonexistentClientError); }

    res.status(StatusCodes.OK).json(accountBalance);
};
const makeAccountDeposit = async (req, res, next) => {
    const { CodCliente, Valor } = req.body;
    const newAccountBalance = await accountsService.makeAccountDeposit(CodCliente, Valor);

    if (!newAccountBalance) { return next(nonexistentClientError); }

    res.status(StatusCodes.OK).json(newAccountBalance);
};

const makeAccountWithdrawal = async (req, res, next) => {
    const { CodCliente, Valor } = req.body;
    const newAccountBalance = await accountsService.makeAccountWithdrawal(CodCliente, Valor);

    if (!newAccountBalance) { return next(nonexistentClientError); }

    res.status(StatusCodes.OK).json(newAccountBalance);
};

module.exports = {
    getAccountBalanceByClientId,
    makeAccountDeposit,
    makeAccountWithdrawal,
};