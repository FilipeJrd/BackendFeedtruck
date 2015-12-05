/**
 * Created by filipe on 11/29/15.
 */
var express = require('express');
var router = express.Router();
var ftController = require('../controllers/foodtrucksController');
var userController = require('../controllers/usersController');
var estController  = require ('../controllers/establishmentController');

var express = require('express');
var router = express.Router();

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

// aqui vamos definir todas as possibilidades de requests feitos no endereço /api/foodtrucks
// sendo esses gets posts updates ...

//var auth = require('../authentication/basicAuthEstablishment');

    router.get('/', function (req, res) {
        if (req.user.category === 'Foodtruck')
            ftController.getSpecific(req, res, next);
        else if (req.user.category === 'Establishment')
            estController.getSpecific(req, res, next);
    });

    router.post('/', passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash: true
    }));


    module.exports = router;
}