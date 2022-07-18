const { StatusCodes } = require('http-status-codes');
const Sequelize = require('sequelize');
const config = require('../db/config/config');

const sequelize = new Sequelize(config.development);
const { Cliente, Extrato } = require('../db/models');

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

const makeAccountTransaction = async (CodCliente, Valor, newSaldo, transactionType) => {
    const t = await sequelize.transaction();
    try {
        await Cliente.update(
        { Saldo: newSaldo },
        { where: { CodCliente }, transaction: t },
      );
        
      await Extrato.create({ CodCliente, Valor, Operacao: transactionType }, { transaction: t });
  
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

  if (oldAccountBalance.error) { return oldAccountBalance; }

  const newSaldo = oldAccountBalance.Saldo + Valor;

  await makeAccountTransaction(CodCliente, Valor, newSaldo, 'Deposito');
  const newAccountBalance = await getAccountBalanceByClientId(CodCliente);
  return newAccountBalance;
};

const makeAccountWithdrawal = async (CodCliente, Valor) => {
  const oldAccountBalance = await getAccountBalanceByClientId(CodCliente);

  if (oldAccountBalance.error) { return oldAccountBalance; }

  const newSaldo = oldAccountBalance.Saldo - Valor;
  if (newSaldo < 0) {
    return { error: insufficientFundsError };
  }

  await makeAccountTransaction(CodCliente, Valor, newSaldo, 'Retirada');

  const newAccountBalance = await getAccountBalanceByClientId(CodCliente);
  return newAccountBalance;
};

module.exports = {
  getAccountBalanceByClientId,
  makeAccountDeposit,
  makeAccountWithdrawal,
};
