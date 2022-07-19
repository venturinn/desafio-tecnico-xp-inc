const express = require('express');
require('express-async-errors');
const assetsController = require('../controllers/assetsController');
const { authenticationValidate } = require('../middlewares');

const assetsRouter = express.Router();

assetsRouter.get('/:id', authenticationValidate, assetsController.getAssetById);

module.exports = assetsRouter;