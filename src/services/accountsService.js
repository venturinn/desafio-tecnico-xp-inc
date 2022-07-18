const { Cliente } = require('../db/models');

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

  if (updatededAccountBalance[0] === 0) {
    const error = new Error();
    error.message = 'Database fail to update';
    error.code = 502;
    throw error;
  }

  const newAccountBalance = await getAccountBalanceByClientId(CodCliente);

  return newAccountBalance;
};

module.exports = {
  getAccountBalanceByClientId,
  makeAccountDeposit,
};
