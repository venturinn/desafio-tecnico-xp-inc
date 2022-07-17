const assetsService = require('../services/assetsService');

const getAssetById = async (req, res) => {
    const { id } = req.params;

    const asset = await assetsService.getAssetById(id);
  
    res.status(200).json(asset);
};

module.exports = {
    getAssetById,
};
