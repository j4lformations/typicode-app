const User = require('../../models/users');

exports.allUsers = async (req, res) => {
    await res
        .status(200)
        .json({
            msg: 'GET ==> Liste des Users en attente de realisation !!!'
        });
}

exports.addUser = async (req, res) => {
    await res
        .status(200)
        .json({
            msg: `'POST ==> Creation d'un User en attente de realisation !!!'`
        });
}