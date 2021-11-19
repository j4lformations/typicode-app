// Crée par Joachim Zadi le 10/11/2021 à 19:47. Version 1.0
// ========================================================

module.exports = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
}