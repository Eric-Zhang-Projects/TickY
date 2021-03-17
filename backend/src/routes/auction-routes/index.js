const auctionRoutes = require('express').Router();
const auction = require('./auction.js');
const authentication = require('../../helpers/authentication');

auctionRoutes.get('/', auction.all);
auctionRoutes.get('/:id', auction.byId);
auctionRoutes.post('/:id/bid', authentication.checkAuthenticated, auction.placeBid);

module.exports = auctionRoutes;