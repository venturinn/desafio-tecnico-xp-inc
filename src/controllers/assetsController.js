const { StatusCodes } = require('http-status-codes');
const assetsService = require('../services/assetsService');

const getAssetById = async (req, res, next) => {
    const { id } = req.params;
    const asset = await assetsService.getAssetById(id);

    if (!asset) {
      return next({
        code: StatusCodes.NOT_FOUND,
        message: 'Asset does not exist',
      });
    }

    res.status(200).json(asset);
};

module.exports = {
  getAssetById,
};
