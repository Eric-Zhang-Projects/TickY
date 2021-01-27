const userRoutes = require('express').Router();
const user = require('./user.js');

userRoutes.post('/login', user.login);
userRoutes.post('/register', user.register);
userRoutes.delete('/logout', user.logout);

module.exports = userRoutes;