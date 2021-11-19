// Crée par Joachim Zadi le 10/11/2021 à 19:25. Version 1.0
// ========================================================
const createError = require("http-errors");
const {json} = require("express");

const saisieMongoInvalide = (error) => {
    const message = `La paire {${error.path}: ${error.value}} est non valide.`;
    return createError(400, message);
}

const duplicationDeSaisie = error => {
    console.log(error);
    const value = error.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `La valeur ${value} existe déjà. Veuillez saisir une autre valeur !!!`;
    return createError(400, message);
};

const erreurDeValidationMongo = error => {
    const errors = Object.values(error.errors).map(el => el.message);
    const message = `Données saisies non valides. ${errors.join('. ')}`;
    return createError(400, message);
};

const sendError = (error, res) => {
    res
        .status(error.statusCode)
        .json(error)
}

module.exports = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500
    //
    // let errors = {...error};
    //
    // if (error.name === 'CastError') {
    //     error = saisieMongoInvalide(error);
    // }
    //
    // if (error.code === 11000) {
    //     error = duplicationDeSaisie(error);
    // }
    //
    // if (error.name === 'ValidationError') {
    //     error = erreurDeValidationMongo(error);
    // }
    sendError(error, res);
}