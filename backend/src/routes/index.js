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
const {email, password } = req;

Create endpoints to sell a ticket -> create new ticket, auction
create bid for an auction

User routes
[x] POST /login
[x] POST /register
[x] POST /sell
[x] POST /sell/new (adds card info + seller name + rating), add # of transactions
[x] GET /logout
GET /account
    - Seller:
        a. tickets + auctions
    - cusomter:
        a. transaction history / owned tickets
        b. most recent bid only for any auctions
            - retract bid
POST /updateAccount
GET /forgotpassword

BID Routes
/bids/{id}

Home routes
[x] GET / (return list of soon events)
[] GET /search?query= (artist or event name and show results)
    -> /events/{id}
    -> /artists/{id}

Event routes
[x] GET /events (may not have afrontend)
[x] GET /events/{id} (shows event details + auctions)
    -> /artists/{id}
---    -> /auctions/{id}

artist routes
[x]GET /artists
[x]GET /artists/{id} (shows events)
[x]    -> /events/{id}

auction routes
[x]GET /auctions shows all auctions (ordered by recent)
[x] GET /auctions/{id} shows one auction
    -> /events/{id} (?)
    -> /bid
POST /auctions/{id}/bid places bid
    -> /bids/{id}

*/

module.exports = routes;