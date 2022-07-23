const { StatusCodes } = require('http-status-codes');
const Sequelize = require('sequelize');
const config = require('../db/config/config');

require('dotenv/config');

const { NODE_ENV } = process.env;

const sequelize = new Sequelize(config[NODE_ENV]);
const { Cliente, Extrato, Ativo } = require('../db/models');

const { nonexistentClientError, insufficientFundsError } = require('../utils/errors');

const getAccountBalanceByClientId = async (id) => {
  const accountBalance = await Cliente.findByPk(id, {
    attributes: { exclude: ['nome', 'email', 'senha'] },
  });

  if (!accountBalance) {
    return { error: nonexistentClientError };
  }

  accountBalance.saldo = Number(accountBalance.saldo);
  return accountBalance.dataValues;
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

const standardizeResult = (portfolio) => {
    const portfolioApiPattern = [];

    portfolio[0].ativos.forEach((ativo) => {
        portfolioApiPattern.push({
           codCliente: portfolio[0].codCliente,
           codAtivo: ativo.codAtivo,
           qtdeAtivo: Number(ativo.Carteira.qtdeAtivo),
           valor: ativo.Carteira.qtdeAtivo * ativo.valor,
        });
    });

    return portfolioApiPattern;
};

const getPortfolioByClientId = async (codCliente) => {
   const verifyClientId = await getAccountBalanceByClientId(codCliente);

   if (verifyClientId.error) { return verifyClientId; }

    const portfolio = await Cliente.findAll({ 
        where: { codCliente },
        include: [{ 
        model: Ativo,
        as: 'ativos', 
        attributes: ['codAtivo', 'valor'], 
        through: { attributes: ['qtdeAtivo'] } }],
        attributes: ['codCliente'],
    });

    if (portfolio.lenght === 0) { return portfolio; }
  
    return standardizeResult(portfolio);
  };

module.exports = {
  getAccountBalanceByClientId,
  makeAccountDeposit,
  makeAccountWithdrawal,
  getPortfolioByClientId,
};
