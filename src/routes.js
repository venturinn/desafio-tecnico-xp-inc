const express = require('express');

const { assetsRouter, accountsRouter } = require('./routers');

const router = express.Router();

router.use('/ativos', assetsRouter);
router.use('/conta', accountsRouter);

module.exports = router;
