const assetsService = require('../services/assetsService');

const getAssetById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const asset = await assetsService.getAssetById(id);

    if (!asset) {
      return next({
        code: 404,
        message: 'Asset does not exist',
      });
    }

    res.status(200).json(asset);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAssetById,
};
