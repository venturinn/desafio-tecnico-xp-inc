const { StatusCodes } = require('http-status-codes');
const Sequelize = require('sequelize');
const config = require('../db/config/config');

const sequelize = new Sequelize(config.development);
const { Cliente, Extrato } = require('../db/models');

const { nonexistentClientError, insufficientFundsError } = require('../utils/errors');

const getAccountBalanceByClientId = async (id) => {
  const accountBalance = await Cliente.findByPk(id, {
    attributes: { exclude: ['nome', 'email', 'senha'] },
  });

  if (!accountBalance) {
    return { error: nonexistentClientError };
  }

  accountBalance.saldo = Number(accountBalance.saldo); // MySQL decimal field returned as string
  return accountBalance;
};

const makeAccountTransaction = async (codCliente, valor, newSaldo, transactionType) => {
    const t = await sequelize.transaction();
    try {
        await Cliente.update(
        { saldo: newSaldo },
        { where: { codCliente }, transaction: t },
      );
        
      await Extrato.create({ codCliente, valor, operacao: transactionType }, { transaction: t });
  
      await t.commit();
    } catch (e) {
      await t.rollback();
      const error = new Error(e.message);
      error.code = StatusCodes.SERVICE_UNAVAILABLE;
      throw error;
    }
};

const makeAccountDeposit = async (codCliente, valor) => {
  const oldAccountBalance = await getAccountBalanceByClientId(codCliente);

  if (oldAccountBalance.error) { return oldAccountBalance; }

  const newSaldo = oldAccountBalance.saldo + valor;

  await makeAccountTransaction(codCliente, valor, newSaldo, 'Deposito');
  const newAccountBalance = await getAccountBalanceByClientId(codCliente);
  return newAccountBalance;
};

const makeAccountWithdrawal = async (codCliente, valor) => {
  const oldAccountBalance = await getAccountBalanceByClientId(codCliente);

  if (oldAccountBalance.error) { return oldAccountBalance; }

  const newSaldo = oldAccountBalance.saldo - valor;
  if (newSaldo < 0) {
    return { error: insufficientFundsError };
  }

  await makeAccountTransaction(codCliente, valor, newSaldo, 'Retirada');

  const newAccountBalance = await getAccountBalanceByClientId(codCliente);
  return newAccountBalance;
};

module.exports = {
  getAccountBalanceByClientId,
  makeAccountDeposit,
  makeAccountWithdrawal,
};
