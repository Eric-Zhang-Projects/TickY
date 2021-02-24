const routes = require('express').Router();
const homeRoutes = require('./home-routes');
const userRoutes = require('./user-routes');
const eventRoutes = require('./event-routes');
const artistRoutes = require('./artist-routes');
const auctionRoutes = require('./auction-routes');

routes.use('/', homeRoutes);

routes.use('/', userRoutes);

routes.use('/events', eventRoutes);

routes.use('/artists', artistRoutes);

routes.use('/auctions', auctionRoutes);

/*

Create endpoints to sell a ticket -> create new ticket, auction
create bid for an auction

User routes
[x] POST /login
[x] POST /register
[x] POST /sell
GET /logout
GET /account
POST /updateAccount
GET /forgotpassword

Home routes
[x] GET / (return list of soon events)
[] GET /search?query= (artist or event name and show results)
    -> /events/{id}
    -> /artists/{id}

Event routes
[x] GET /events (may not have afrontend)
[x] GET /events/{id} (shows event details + auctions)
    -> /artists/{id}
    -> /auctions/{id}

artist routes
[x]GET /artists
[x]GET /artists/{id} (shows events)
    -> /events/{id}

auction routes
[x]GET /auctions shows all auctions (ordered by recent)
GET /auctions/{id} shows one auction
    -> /events/{id}
    -> /bid
POST /bid places bid



*/

module.exports = routes;