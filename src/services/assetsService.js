const { Ativo } = require('../db/models');

const getAssetById = async (id) => {
  const asset = await Ativo.findByPk(id, {
    attributes: { exclude: ['TickerAtivo'] },
  });

  if (!asset) { return null; }

  asset.Valor = Number(asset.Valor); // MySQL decimal field returned as string
  return asset;
};

module.exports = {
  getAssetById,
};
