const homeRoutes = require('express').Router();
const home = require('./home.js');
const authentication = require('../../helpers/authentication.js');

homeRoutes.get('/', authentication.allAllowed, home.soonest);

module.exports = homeRoutes;