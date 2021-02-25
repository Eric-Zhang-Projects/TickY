const auctionDAO = require('./auction-dao');

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
        res.json(auction);
    } catch (err){
        console.log(err + " error getting auction by Id");
    }
}

const placeBid = async (req, res) => {

}

module.exports = {
    all,
    byId,
    placeBid
}