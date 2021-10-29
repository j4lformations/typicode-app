const mongoose = require('mongoose');

const LOCAL_SERVER = process.env.DB_HOST_LOCAL
    .replace('<DATABASE>', process.env.DB_NAME);

const REMOTE_SERVER = process.env.DB_HOST_REMOTE
    .replace('<USER>', process.env.DB_USER_REMOTE)
    .replace('<PASSWORD>', process.env.DB_PASS_REMOTE)
    .replace('<DATABASE>', process.env.DB_NAME);

const MONGO_SERVER = process.env.NODE_ENV === 'dev' ? LOCAL_SERVER : REMOTE_SERVER;

exports.mongoConnexion = mongoose.connect(MONGO_SERVER)
    .then(() => {
        console.log("CONNEXION AU SERVEUR MONGO OK !!!");
    })
    .catch(error => {
        console.log("CONNEXION AU SERVEUR MONGO NOK !!!", `==> cause : ${error.message}`);
    });