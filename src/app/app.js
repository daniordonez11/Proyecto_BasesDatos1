const express = require('express');
const morgan = require('morgan');

const router = require('../router/producto.router');

const app = express();

app.use(morgan('dev')); 

app.get('/', (req, res) => {
    res.send('EXPRESS Ms APP')
});

app.use('/api/v1', router);

module.exports = app;