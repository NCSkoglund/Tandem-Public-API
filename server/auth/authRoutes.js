var decodeToken = require('./auth').decodeToken;
var newApiKey = require('./auth').newApiKey;
var router = require('express').Router();
var throttle = require('../middleware/apiRateLimiter');
var authController = require('./authController');
var verifyExistingUser = require('./auth').verifyExistingUser;
var addNewUser = require('./auth').addNewUser;
var validateMail = require('./auth').validateMail;

/*****************************************************************
* PURPOSE: Define AUTH routes - all endpoints relative to /auth
*****************************************************************/

//ALL ROUTES (/auth)- API rate limiting middleware function
router.use(throttle());

//NO AUTH - render login page
router.get('/login', (req, res) => {
  res.set({
    'Set-Cookie': 'access_token=deleted; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
  });
  res.render('login');
});

//NO AUTH - render new sign up page
router.get('/signup', (req, res) => {
  res.render('signup');
});

//NO AUTH - process initial signup details & send verification email
router.post('/signup', addNewUser(), authController.signUp);

//NO AUTH - update user info based on email verification success / failure
router.get('/verify', validateMail(), authController.verify);

//BASIC AUTH - verify existing user, login & return token in authController
router.post('/dashboard', verifyExistingUser(), authController.dashboard);

//BEARER AUTH - check user already signed in & valid, generate new Api key pair & re-render
router.post('/newkey', decodeToken(), newApiKey(), authController.dashboard);

//BEARER AUTH - log user out
router.post('/logout', decodeToken(), authController.logOut);

//Catch all path for invalid routes
router.get('*', (req, res) => {
  res.status(404).send('Page not found');
})

module.exports = router;