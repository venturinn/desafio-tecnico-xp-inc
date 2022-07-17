const express = require('express');
const assetsController = require('../controllers/assetsController');

const assetsRouter = express.Router();

assetsRouter.get('/:id', assetsController.getAssetById);

module.exports = assetsRouter;