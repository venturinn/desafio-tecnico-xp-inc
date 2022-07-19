const express = require('express');
const routes = require('./routes');
const { error } = require('./middlewares');

const app = express();

app.use(express.json());
app.use(routes);
app.use(error);

app.use((_req, res, _next) => {
    res.status(404).json({ message: 'Page Not Found!' });
});

module.exports = app;
