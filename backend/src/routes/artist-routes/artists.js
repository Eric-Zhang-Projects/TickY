const artistDAO = require('./artistsDAO');

const all = async (req, res) => {
    let response = await artistDAO.getAllArtists();
    res.json({user: res.locals.user, response: response});
};

const byId = async (req, res) => {
    console.log("Getting artist by Id");
    try {
        let artistDetailsById = await artistDAO.getArtistDetailsById(req.params.id);
        var artist = {};
        var events = [];
        var response = {};
        artistDetailsById.forEach(row => {
            if (row.artist_id !== null){
                artist = {id: row.artist_id, name: row.artist_name, image: row.artist_image}
            } else {
                events.push({
                    id: row.event_id, 
                    name: row.event_name, 
                    date: row.date, 
                    venue_name: row.venue_name, 
                    location: row.location
                });
            }
        })
        var response = {artist: artist, events: events};
        res.json({user: res.locals.user, response: response});
    } catch (err){
        console.log(err);
    }
};

module.exports = {
    all,
    byId,
}