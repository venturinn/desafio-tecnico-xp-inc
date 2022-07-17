const express = require('express');

const { assetsRouter } = require('./routers');

const router = express.Router();

router.use('/ativos', assetsRouter);

module.exports = router;