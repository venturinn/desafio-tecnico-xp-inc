const { StatusCodes } = require('http-status-codes');
const { Ativo } = require('../db/models');

const getAssetById = async (id) => {
  const asset = await Ativo.findByPk(id, {
    attributes: { exclude: ['TickerAtivo'] },
  });

  if (!asset) {
    return {
      error: {
        code: StatusCodes.NOT_FOUND,
        message: `Asset ${id} does not exist`,
      },
    };
  }

  asset.valor = Number(asset.valor); // MySQL decimal field returned as string
  return asset;
};

module.exports = {
  getAssetById,
};
