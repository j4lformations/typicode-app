const {Router} = require('express');
const router = Router();
const {authController} = require('../controllers/index');

router
    .route('/signin')
    .get(authController.formSignin)
    .post(authController.signin);

router
    .route('/signup')
    .get(authController.formSignup)
    .post(authController.signup);

router
    .route('/logout')
    .get(authController.logout);

module.exports = router;