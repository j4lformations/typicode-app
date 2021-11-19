const userRouter = require('./users');
const authRouter = require('./auth');
const globalErrorHandler = require('../controllers/index');
const createError = require("http-errors");
const AppError = require('../utils/appError');

module.exports = (app) => {

    // gestion des authentification
    app.use('/auth', authRouter);

    // gestion des users
    app.use('/users', userRouter);

    // page accueil
    app.get('/', function (req, res) {
        res
            .status(200)
            .render('base');
    });

    // Le serveur n'a pas trouvé la ressource demandée
    app.use((req, res, next) => {
        const error = createError(404, `La route ${req.url} est introuvable sur le serveur !!!`);
        next(error);
    });

    // gestion global des erreurs
    app.use(globalErrorHandler.errorController);
}