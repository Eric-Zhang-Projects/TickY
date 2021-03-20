const homeRoutes = require('express').Router();
const home = require('./home.js');
const authentication = require('../../helpers/authentication');

homeRoutes.get('/', authentication.checkAuthenticated, home.soonest);

module.exports = homeRoutes;