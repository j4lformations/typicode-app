const {Router} = require('express');
const router = Router();
const {userController} = require('../controllers/index');

router
    .route('/')
    .get(userController.allUsers)
    .post(userController.addUser);

router
    .route('/:id')
    .get(userController.getUserById);

module.exports = router;