const { StatusCodes } = require('http-status-codes');
const Sequelize = require('sequelize');
const { Ativo, Cliente, Carteira, Extrato } = require('../db/models');
const config = require('../db/config/config');

require('dotenv/config');

const { NODE_ENV } = process.env;
let sequelizeEnv = 'development';
if (NODE_ENV === 'test') { sequelizeEnv = 'test'; }

const sequelize = new Sequelize(config[sequelizeEnv]);
const assetsService = require('./assetsService');
const accountsService = require('./accountsService');
const { insufficientAssetsError,
    insufficientFundsError,
    insufficientPortfolioError } = require('../utils/errors');

const getAssetClientPortfolio = async (codCliente, codAtivo) => {
  const assetClientPortfolio = await Carteira.findOne({
    where: { codCliente, codAtivo },
  });
  return assetClientPortfolio;
};

const updateClientAccount = async (t, data) => {
  const { codCliente, newSaldo } = data;
  await Cliente.update(
    { saldo: newSaldo },
    { where: { codCliente }, transaction: t },
  );
};

const updateAssetMarket = async (t, data) => {
  const { newAssetQuantityMarket, codAtivo } = data;
  await Ativo.update(
    { qtdeAtivo: newAssetQuantityMarket },
    { where: { codAtivo }, transaction: t },
  );
};

const updateClientPortfolio = async (t, data) => {
  const { codCliente, codAtivo, qtdeAtivo, transactionType, newAssetQuantityClient } = data;

  if (transactionType === 'Venda') {
    Carteira.update(
      { qtdeAtivo: newAssetQuantityClient },
      { where: { codAtivo, codCliente }, transaction: t },
    );
    return;
  }

  const verifyAssetPortfolio = await getAssetClientPortfolio(codCliente, codAtivo);
  if (!verifyAssetPortfolio) {
    await Carteira.create({ codCliente, codAtivo, qtdeAtivo }, { transaction: t });
  } else {
    await Carteira.update(
      { qtdeAtivo: verifyAssetPortfolio.qtdeAtivo + qtdeAtivo },
      { where: { codAtivo, codCliente }, transaction: t },
    );
  }
};

const updateStatement = async (t, data) => {
  const { codCliente, codAtivo, qtdeAtivo, transactionValue, transactionType } = data;

  await Extrato.create(
    {
      codCliente,
      codAtivo,
      qtdeAtivo,
      valor: transactionValue,
      operacao: transactionType,
    },
    { transaction: t },
  );
};

const assetTransaction = async (data) => {
  const t = await sequelize.transaction();
  try {
    await updateClientAccount(t, data);
    await updateAssetMarket(t, data);
    await updateClientPortfolio(t, data);
    await updateStatement(t, data);

    await t.commit();
  } catch (e) {
    await t.rollback();
    const error = new Error(e.message);
    error.code = StatusCodes.SERVICE_UNAVAILABLE;
    throw error;
  }
};

const buyAsset = async (codCliente, codAtivo, qtdeAtivo) => {
  const accountBalance = await accountsService.getAccountBalanceByClientId(codCliente);
  if (accountBalance.error) { return accountBalance; }

  const asset = await assetsService.getAssetById(codAtivo);
  if (asset.error) { return asset; }

  const newAssetQuantityMarket = asset.qtdeAtivo - qtdeAtivo;
  if (newAssetQuantityMarket < 0) { return { error: insufficientAssetsError }; }

  const transactionValue = qtdeAtivo * asset.valor;
  const newSaldo = accountBalance.saldo - transactionValue;
  if (newSaldo < 0) { return { error: insufficientFundsError }; }

  const transactionData = { codCliente,
    codAtivo,
    qtdeAtivo,
    newSaldo,
    newAssetQuantityMarket,
    transactionValue,
    transactionType: 'Compra' };

  await assetTransaction(transactionData);

  return { message: 'Buy transaction done.' };
};

// eslint-disable-next-line max-lines-per-function
const sellAsset = async (codCliente, codAtivo, qtdeAtivo) => {
  const accountBalance = await accountsService.getAccountBalanceByClientId(codCliente);
  if (accountBalance.error) { return accountBalance; }

  const asset = await assetsService.getAssetById(codAtivo);
  if (asset.error) { return asset; }

  const verifyAssetPortfolio = await getAssetClientPortfolio(codCliente, codAtivo);

  if (!verifyAssetPortfolio || verifyAssetPortfolio.qtdeAtivo - qtdeAtivo < 0) {
    return { error: insufficientPortfolioError }; 
}
  const newAssetQuantityClient = verifyAssetPortfolio.qtdeAtivo - qtdeAtivo;

  const newAssetQuantityMarket = asset.qtdeAtivo + qtdeAtivo;
  const transactionValue = qtdeAtivo * asset.valor;
  const newSaldo = accountBalance.saldo + transactionValue;

  const transactionData = { codCliente,
    codAtivo,
    qtdeAtivo,
    newSaldo,
    newAssetQuantityClient,
    newAssetQuantityMarket,
    transactionValue,
    transactionType: 'Venda' };

  await assetTransaction(transactionData);

  return { message: 'Sell transaction done.' };
};

module.exports = {
  buyAsset,
  sellAsset,
};
