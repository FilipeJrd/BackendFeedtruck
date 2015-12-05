var express = require('express');
var router = express.Router();
var userContoller = require('../controllers/usersController');
var establishmentController = require('../controllers/establishmentController');

var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
}

module.exports = function(passport) {

//router.get('/',auth.basicAuth, establishmentController.findAll);

    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/home',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    module.exports = router;
}