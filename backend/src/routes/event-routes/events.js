const eventsDAO = require('./events-dao')

const all = async (req, res) => {
  try {
    let allEvents = await eventsDAO.getAllEvents();
    res.json(allEvents);
  } catch (err){
    console.log(err);
  }
};

const byId = async (req, res) => {
  try {
    let eventVenueData = await eventsDAO.getEventVenueDetailsById(req.params.id);
    let artistData = await eventsDAO.getEventArtistsById(req.params.id);
    let auctionData = await eventsDAO.getEventAcutionsById(req.params.id);
    var response = {...eventVenueData, lineup: [], auctions: []};
    artistData.forEach(artist => {
      response.lineup.push({...artist});
    })
    auctionData.forEach(auction => {
      response.auctions.push({...auction});
    })
    if (response.auctions.length === 0) response.auctions = null;
    res.json({user: res.locals.user, response: response});
  } catch (err){
    console.log(err);
  }
};

module.exports = {
  all,
  byId,
}