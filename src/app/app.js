const express = require('express');
const morgan = require('morgan');

const router = require('../router/usuario.router');

const app = express();

app.use(morgan('dev')); 

app.get('/', (req, res) => {
    res.send('EXPRESS Ms APP')
});

app.use(express.json());
app.use('/api/v1', router);

module.exports = app;