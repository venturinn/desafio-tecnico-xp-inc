const { StatusCodes } = require('http-status-codes');
const { Ativo } = require('../db/models');

const getAssetById = async (id) => {
  const asset = await Ativo.findByPk(id);

  if (!asset) {
    return {
      error: {
        code: StatusCodes.NOT_FOUND,
        message: `Asset ${id} does not exist`,
      },
    };
  }

  asset.valor = Number(asset.valor);
  asset.qtdeAtivo = Number(asset.qtdeAtivo);

  return asset.dataValues;
};

module.exports = {
  getAssetById,
};
