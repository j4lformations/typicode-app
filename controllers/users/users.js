const User = require('../../models/users');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const createError = require("http-errors");
const {Types} = require('mongoose');

exports.allUsers = catchAsync(async (req, res, next) => {
    const users = await User.find({});
    await res
        .status(200)
        .json(users);
});

exports.addUser = async (req, res, next) => {
    await res
        .status(200)
        .json({
            msg: `'POST ==> Creation d'un User en attente de realisation !!!'`
        });
}

exports.getUserById = catchAsync(async (req, res, next) => {
    // si l'id mongo n'est pas valide
    if (!Types.ObjectId.isValid(req.params.id)) {
        return next(createError(404, `Aucun utilisateur trouvé avec l'ID ${req.params.id}`))
    }

    const user = await User.findById(req.params.id);

    // si aucun utilisateur n'est trouvé
    if (!user) {
        return next(createError(400, `Mauvaise Requete`));
    }
    await res
        .status(200)
        .json(user);
})