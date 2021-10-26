const express = require('express');
const dotenv = require('dotenv');
const middlewares = require('./middlewares/middlewares');

// fichier .env
dotenv.config();

// serveur express
const app = express();

// middlewares
middlewares(app);

app.get('/', function (req, res) {
    res.send('Hello World')
})

module.exports = app;