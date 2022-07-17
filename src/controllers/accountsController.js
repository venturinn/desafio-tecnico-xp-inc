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

module.exports = {
    getAccountBalanceByClientId,
};