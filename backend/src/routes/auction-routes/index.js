const auctionRoutes = require('express').Router();
const auction = require('./auction.js');

auctionRoutes.get('/', auction.all);
auctionRoutes.get('/:id', auction.byId);
//auctionRoutes.get('/')

module.exports = auctionRoutes;