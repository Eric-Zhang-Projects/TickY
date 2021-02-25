const auctionRoutes = require('express').Router();
const auction = require('./auction.js');

auctionRoutes.get('/', auction.all);
auctionRoutes.get('/:id', auction.byId);
auctionRoutes.post('/bid', auction.placeBid);

module.exports = auctionRoutes;