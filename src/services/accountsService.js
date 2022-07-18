const { StatusCodes } = require('http-status-codes');
const Sequelize = require('sequelize');
const config = require('../db/config/config');

const sequelize = new Sequelize(config.development);
const { Cliente, Extrato } = require('../db/models');

const updateError = () => {
  const error = new Error();
  error.message = 'Database fail to update';
  error.code = StatusCodes.SERVICE_UNAVAILABLE;
  throw error;
};

const nonexistentClientError = {
  code: StatusCodes.NOT_FOUND,
  message: 'Client does not exist',
};

const insufficientFundsError = {
  code: StatusCodes.UNAUTHORIZED,
  message: 'Insufficient funds',
};

const getAccountBalanceByClientId = async (id) => {
  const accountBalance = await Cliente.findByPk(id, {
    attributes: { exclude: ['Nome', 'Email', 'Senha'] },
  });

  if (!accountBalance) {
    return { error: nonexistentClientError };
  }

  accountBalance.Saldo = Number(accountBalance.Saldo); // MySQL decimal field returned as string
  return accountBalance;
};

const makeDepositTransaction = async (CodCliente, Valor, oldSaldo) => {
    const t = await sequelize.transaction();
    try {
      const updatededAccountBalance = await Cliente.update(
        { Saldo: oldSaldo + Valor },
        { where: { CodCliente }, transaction: t },
      );
      if (updatededAccountBalance[0] === 0) { updateError(); }
  
      await Extrato.create({ CodCliente, Valor, Operacao: 'Deposito' }, { transaction: t });
  
      await t.commit();
    } catch (e) {
      await t.rollback();
      const error = new Error(e.message);
      error.code = StatusCodes.SERVICE_UNAVAILABLE;
      throw error;
    }
};

const makeAccountDeposit = async (CodCliente, Valor) => {
  const oldAccountBalance = await getAccountBalanceByClientId(CodCliente);

  if (oldAccountBalance.error) {
    return { error: nonexistentClientError };
  }

  await makeDepositTransaction(CodCliente, Valor, oldAccountBalance.Saldo);
  const newAccountBalance = await getAccountBalanceByClientId(CodCliente);
  return newAccountBalance;
};

const makeAccountWithdrawal = async (CodCliente, Valor) => {
  const oldAccountBalance = await getAccountBalanceByClientId(CodCliente);

  if (oldAccountBalance.error) {
    return { error: nonexistentClientError };
  }
  if (oldAccountBalance.Saldo - Valor < 0) {
    return { error: insufficientFundsError };
  }

  const updatededAccountBalance = await Cliente.update(
    { Saldo: oldAccountBalance.Saldo - Valor },
    { where: { CodCliente } },
  );

  if (updatededAccountBalance[0] === 0) {
    updateError();
  }

  const newAccountBalance = await getAccountBalanceByClientId(CodCliente);
  return newAccountBalance;
};

module.exports = {
  getAccountBalanceByClientId,
  makeAccountDeposit,
  makeAccountWithdrawal,
};
