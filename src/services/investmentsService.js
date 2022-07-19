const { StatusCodes } = require('http-status-codes');
const Sequelize = require('sequelize');
const { Ativo, Cliente, Carteira, Extrato } = require('../db/models');

const config = require('../db/config/config');

const sequelize = new Sequelize(config.development);

const assetsService = require('./assetsService');
const accountsService = require('./accountsService');

const insufficientAssetsError = {
  code: StatusCodes.UNAUTHORIZED,
  message: 'Asset illiquid',
};
const insufficientFundsError = {
  code: StatusCodes.UNAUTHORIZED,
  message: 'Insufficient funds',
};

let transactionData = {};

const updateClientAccount = async (t) => {
  const { codCliente, newSaldo } = transactionData;
  await Cliente.update(
    { saldo: newSaldo },
    { where: { codCliente }, transaction: t },
  );
};

const updateAsset = async (t) => {
  const { newAssetQuantity, codAtivo } = transactionData;
  await Ativo.update(
    { qtdeAtivo: newAssetQuantity },
    { where: { codAtivo }, transaction: t },
  );
};
const updateClientPortfolio = async (t) => {
  const { codCliente, codAtivo, qtdeAtivo } = transactionData;
  const verifyAssetPortfolio = await Carteira.findOne(
    { where: { codCliente, codAtivo } },
    { transaction: t },
  );

  if (!verifyAssetPortfolio) {
    await Carteira.create(
      { codCliente, codAtivo, qtdeAtivo },
      { transaction: t },
    );
  } else {
    await Carteira.update(
      { qtdeAtivo: verifyAssetPortfolio.qtdeAtivo + qtdeAtivo },
      { where: { codAtivo, codCliente }, transaction: t },
    );
  }
};

const updateStatement = async (t) => {
  const { codCliente, 
    codAtivo, 
    qtdeAtivo, 
    transactionValue, 
    transactionType } = transactionData;

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

const assetTransaction = async () => {
  const t = await sequelize.transaction();
  try {
    await updateClientAccount(t);
    await updateAsset(t);
    await updateClientPortfolio(t);
    await updateStatement(t);

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

  const newAssetQuantity = asset.qtdeAtivo - qtdeAtivo;
  if (newAssetQuantity < 0) { return { error: insufficientAssetsError }; }

  const transactionValue = qtdeAtivo * asset.valor;
  const newSaldo = accountBalance.saldo - transactionValue;
  if (newSaldo < 0) { return { error: insufficientFundsError }; }

  transactionData = { codCliente,
    codAtivo,
    qtdeAtivo,
    newSaldo,
    newAssetQuantity,
    transactionValue,
    transactionType: 'Compra' };

  await assetTransaction();

  return asset;
};

module.exports = {
  buyAsset,
};
