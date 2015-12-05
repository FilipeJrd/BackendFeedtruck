var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./Mongo/config');
var foodtrucks = require('./routes/foodtruckRoute');
var establishment = require('./routes/establishmentRoute');
var login = require('./routes/loginRoute');
var signup = require('./routes/signupRoute');
var testes = require('./routes/testeRoute');
var app = express();

app.use(favicon());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(passport.initialize());

var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));

app.use(passport.initialize());
app.use(passport.session());

var initPassport = require('./passport/init');
initPassport(passport);

var flash = require('connect-flash');
app.use(flash());

var port = config.port;
var ip = config.ip;

var http = require('http');
var server = http.createServer(app)

var router = express.Router();
router.use(bodyParser.json());

// diz para onde devem ser repassadas requisições com terminação em /foodtrucks no seu endereço http
// vamos utilizar mais repasses desses quando for inserido espaços por exemplo
router.use('/foodtrucks', foodtrucks);
router.use('/establishments', establishment);
router.use('/login',login);
router.use('/signup',signup);
router.use('/arthurtomanomeiodoteucu',testes);

// define que todas as requisições começam com /api  por exemplo /api/foodtrucks
app.use('/api', router);

server.listen(port, ip ,  function () {
    console.log("running on port: " + port);
});