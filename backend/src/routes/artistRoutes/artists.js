const artistDAO = require('./artistsDAO');

const all = async (req, res) => {
    let response = await artistDAO.getAllArtists();
    res.json(response);
};

const byId = async (req, res) => {
    try {
        let artistDetailsById = await artistDAO.getArtistDetailsById(req.params.id);
        var artist = {};
        var events = [];
        var response = {};
        artistDetailsById.forEach(row => {
            if (row.artist_id !== null){
                artist = {id: row.artist_id, name: row.artist_name, image: row.artist_image}
            } else {
                var event = {id: row.event_id, name: row.event_name, date: row.date, venue_name: row.venue_name, location: row.location}
                events.push(event);
            }
        })
        var response = {artist: artist, events: events};
        res.json(response);
    } catch (err){
        console.log(err);
    }
};

module.exports = {
    all,
    byId,
}