const userRoutes = require('express').Router();
const user = require('./user.js');
const accountServices = require('./account-services.js');
const passport = require('passport');
const authentication = require('../../helpers/authentication');

const initialize = require('./passportConfig.js');
initialize(passport);

userRoutes.post('/login', user.login);
userRoutes.post('/register', user.register);
userRoutes.delete('/logout', authentication.checkAuthenticated, user.logout);

userRoutes.post('/sell', authentication.checkAuthenticated, accountServices.sell);
userRoutes.post('/sell/onboard', authentication.checkAuthenticated, accountServices.onboard);

module.exports = userRoutes;