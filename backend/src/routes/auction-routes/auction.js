const auctionDAO = require('./auction-dao');
const uuid = require('uuid');

const all = async (req, res) => {
    try {
        const allAuctions = await auctionDAO.getAllAuctions();
        res.json(allAuctions);
    } catch (err){
        console.log(err + " error getting all auctions");
    }
}

const byId = async (req, res) => {
    try {
        const auction = await auctionDAO.getAuctionById(req.params.id);
        const bids = await auctionDAO.getBidsByAuctionId(req.params.id, 'bf4405d3-bc4f-4761-b8d9-a16ad40fa9b0');
        var response = {...auction, bids: []};
        bids.forEach(bid => {
            response.bids.push(bid);
        })
        res.json(response);
    } catch (err){
        console.log(err + " error getting auction by Id");
    }
}

const placeBid = async (req, res) => {
    try {
        const bid = {
            id: uuid.v4(),
            auction_id: req.params.id,
            bidder_id: req.session.passport.user,
            offer: req.body.offer,
            date: 'now()',
            is_active: true
        }
        const placeBid = await auctionDAO.placeBid(bid);
        console.log(placeBid);
        if (placeBid === undefined){
            res.json("Failed to place bid");
        } else {
            res.json("Successfully placed bid");
        }
    } catch (err) {
        console.log(err + "\nFailed to place bid");
    }

}

module.exports = {
    all,
    byId,
    placeBid
}