// Crée par Joachim Zadi le 10/11/2021 à 18:40. Version 1.0
// ========================================================

class AppError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;