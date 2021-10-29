const {Router} = require('express');
const router = Router();
const {userController} = require('../controllers/index');

router
    .route('/')
    .get(userController.allUsers)
    .post(userController.addUser);

module.exports = router;