const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const path = require('path');

module.exports = (app) => {
    // pug
    app.set('view engine', 'pug');

    // fichiers statics
    app.use(express.static(path.join(__dirname,'../public')));

    // morgan
    if (process.env.NODE_ENV === 'dev') {
        app.use(morgan(process.env.MORGAN_MODE))
    }

    // les cors
    app.use(cors());

    // json-parser
    app.use(express.json());
}