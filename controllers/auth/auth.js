const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const User = require('../../models/users');
const catchAsync = require('../../utils/catchAsync');

// permet de generer un web token
const signToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
}

// cree et envoie un jwt au navigateur
const createAndSendToken = (user, statusCode, res) => {
    // generation du token utilisateur
    const token = signToken(user._id);

    // generation des options du token
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    // on active la securite seulement en production
    if (process.env.NODE_ENV === 'prod') {
        cookieOptions.secure = true;
    }

    // on encapsule le token et ses options dans la reponse
    res.cookie('t', token, cookieOptions);

    user.mdp = undefined;
    user.actif = undefined;

    // on genere la reponse
    res
        .status(statusCode)
        .json({
            status: 'success',
            token,
            user
        });
}

// Affiche le formulaire de login
exports.formSignin = async (req, res) => {
    try {
        res
            .status(200)
            .json({
                msg: `Formulaire d'authentification en attente de realisation !!!`
            });
    } catch (e) {
    }
}

// processus de login
exports.signin = async (req, res) => {
    try {
        res
            .status(200)
            .json({
                msg: `Processus d'authentification en attente de realisation !!!`
            });
    } catch (error) {
    }
}

// Affiche le formulaire d'enregistrement
exports.formSignup = async (req, res) => {
    res
        .status(200)
        .json({
            msg: `Formulaire d'enregistrement en attente de realisation !!!`
        });
}

// processus d'enregistrement
exports.signup = catchAsync(async (req, res, next) => {
    const {prenom, email, mdp, confirmMdp, role} = await req.body;
    let newUser = new User({
        prenom: prenom,
        email: email,
        mdp: mdp,
        confirmMdp: confirmMdp,
        role: role
    });
    newUser = await newUser.save();
    createAndSendToken(newUser, 200, res);
});

// processus de logout
exports.logout = (req, res) => {
    res
        .status(200)
        .json({
            msg: `Processus de deconnexion en attente de realisation !!!`
        });
}