const { StatusCodes } = require('http-status-codes');
const { Cliente } = require('../db/models');

const updateError = () => {
    const error = new Error();
    error.message = 'Database fail to update';
    error.code = StatusCodes.SERVICE_UNAVAILABLE;
    throw error;
};
const getAccountBalanceByClientId = async (id) => {
  const accountBalance = await Cliente.findByPk(id, {
    attributes: { exclude: ['Nome', 'Email', 'Senha'] },
  });

  if (!accountBalance) {
    return null;
  }

  accountBalance.Saldo = Number(accountBalance.Saldo); // MySQL decimal field returned as string
  return accountBalance;
};

const makeAccountDeposit = async (CodCliente, Valor) => {
  const oldAccountBalance = await getAccountBalanceByClientId(CodCliente);

  if (!oldAccountBalance) {
    return null;
  }

  const updatededAccountBalance = await Cliente.update(
    { Saldo: Valor + oldAccountBalance.Saldo },
    { where: { CodCliente } },
  );

  if (updatededAccountBalance[0] === 0) { updateError(); }

  const newAccountBalance = await getAccountBalanceByClientId(CodCliente);
  return newAccountBalance;
};

const makeAccountWithdrawal = async (CodCliente, Valor) => {
    const oldAccountBalance = await getAccountBalanceByClientId(CodCliente);
  
    if (!oldAccountBalance) {
      return null;
    }

    if (oldAccountBalance.Saldo - Valor < 0) {
        const error = new Error();
        error.message = 'Insufficient funds';
        error.code = StatusCodes.UNAUTHORIZED;
        throw error;
    }
  
    const updatededAccountBalance = await Cliente.update(
      { Saldo: oldAccountBalance.Saldo - Valor },
      { where: { CodCliente } },
    );
  
    if (updatededAccountBalance[0] === 0) { updateError(); }
  
    const newAccountBalance = await getAccountBalanceByClientId(CodCliente);
    return newAccountBalance;
  };

module.exports = {
  getAccountBalanceByClientId,
  makeAccountDeposit,
  makeAccountWithdrawal,
};
