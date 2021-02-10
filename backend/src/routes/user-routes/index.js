const userRoutes = require('express').Router();
const user = require('./user.js');
const passport = require('passport');

const initialize = require('./passportConfig.js');
initialize(passport);

userRoutes.post('/login', user.login);
userRoutes.post('/register', user.register);
userRoutes.delete('/logout', user.logout);

module.exports = userRoutes;