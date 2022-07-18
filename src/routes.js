const express = require('express');

const { assetsRouter, accountsRouter, investmentsRouter } = require('./routers');

const router = express.Router();

router.use('/ativos', assetsRouter);
router.use('/conta', accountsRouter);
router.use('/investimentos', investmentsRouter);

module.exports = router;
