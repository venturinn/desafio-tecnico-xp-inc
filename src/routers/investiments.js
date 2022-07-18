const express = require('express');
require('express-async-errors');
const investmentsController = require('../controllers/investmentsController');
const { assetTransactionValidate } = require('../middlewares');

const investmentsRouter = express.Router();

investmentsRouter.post('/comprar', assetTransactionValidate, investmentsController.buyAsset);

module.exports = investmentsRouter;