const accountsService = require('../services/accountsService');

const getAccountBalanceByClientId = async (req, res, next) => {
    const { id } = req.params;
    const accountBalance = await accountsService.getAccountBalanceByClientId(id);

    if (!accountBalance) {
      return next({
        code: 404,
        message: 'Client does not exist',
      });
    }

    res.status(200).json(accountBalance);
};
const makeAccountDeposit = async (req, res, next) => {
    const { CodCliente, Valor } = req.body;
    const newAccountBalance = await accountsService.makeAccountDeposit(CodCliente, Valor);

    if (!newAccountBalance) {
      return next({
        code: 404,
        message: 'Client does not exist',
      });
    }

    res.status(200).json(newAccountBalance);
};

module.exports = {
    getAccountBalanceByClientId,
    makeAccountDeposit,
};