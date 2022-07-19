const { StatusCodes } = require('http-status-codes');
const accountsService = require('../services/accountsService');

const getAccountBalanceByClientId = async (req, res, next) => {
    const { id } = req.params;
    const accountBalance = await accountsService.getAccountBalanceByClientId(id);

    if (accountBalance.error) { return next(accountBalance.error); }

    res.status(StatusCodes.OK).json(accountBalance);
};
const makeAccountDeposit = async (req, res, next) => {
    const { codCliente, valor } = req.body;
    const newAccountBalance = await accountsService.makeAccountDeposit(codCliente, valor);

    if (newAccountBalance.error) { return next(newAccountBalance.error); }

    res.status(StatusCodes.OK).json(newAccountBalance);
};

const makeAccountWithdrawal = async (req, res, next) => {
    const { codCliente, valor } = req.body;
    const newAccountBalance = await accountsService.makeAccountWithdrawal(codCliente, valor);

    if (newAccountBalance.error) { return next(newAccountBalance.error); }

    res.status(StatusCodes.OK).json(newAccountBalance);
};

const getPortfolioByClientId = async (req, res, next) => {
    const { id } = req.params;
    const accountPortfolio = await accountsService.getPortfolioByClientId(id);

    if (accountPortfolio.error) { return next(accountPortfolio.error); }

    res.status(StatusCodes.OK).json(accountPortfolio);
};

module.exports = {
    getAccountBalanceByClientId,
    makeAccountDeposit,
    makeAccountWithdrawal,
    getPortfolioByClientId,
};