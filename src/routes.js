const express = require('express');

const { assetsRouter, accountsRouter, investmentsRouter, loginRouter } = require('./routers');

const router = express.Router();

router.use('/ativos', assetsRouter);
router.use('/conta', accountsRouter);
router.use('/investimentos', investmentsRouter);
router.use('/login', loginRouter);

module.exports = router;
