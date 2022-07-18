const express = require('express');
const routes = require('./routes');
const { error } = require('./middlewares');

const app = express();

app.use(express.json());
app.use(routes);
app.use(error);

module.exports = app;
