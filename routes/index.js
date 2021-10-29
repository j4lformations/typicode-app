const userRouter = require('./users');
const authRouter = require('./auth');
const createError = require("http-errors");

module.exports = (app) => {

    // gestion des authentification
    app.use('/auth',authRouter);

    // gestion des users
    app.use('/users', userRouter);

    // page accueil
    app.get('/', function (req, res) {
        res
            .status(200)
            .render('base');
    });

    // chemin introuvable
    app.use(((req, res) => {
        const error = createError(404, ``);
        res
            .status(error.statusCode)
            .json(error);
    }));
}