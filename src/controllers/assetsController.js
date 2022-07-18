const assetsService = require('../services/assetsService');

const getAssetById = async (req, res, next) => {
  const { id } = req.params;
  const asset = await assetsService.getAssetById(id);

  if (asset.error) { return next(asset.error); }

  res.status(200).json(asset);
};

module.exports = {
  getAssetById,
};
