const express = require('express');
const dotenv = require('dotenv');
const createError = require('http-errors');
const middlewares = require('./middlewares/index');
const routers = require('./routes/index');

// fichier .env
dotenv.config();

require('./config/database');

// serveur express
const app = express();

// middlewares
middlewares(app);

// routes
routers(app);

module.exports = app;