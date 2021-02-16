const pool = require('../../db')

async function getAllArtists() {
    try {
      const getData = await pool.query('select * from artist');
      return getData.rows;
    } catch (err) {
      console.log(err.message);
    }
};

//Gets an Artist + all events
async function getArtistDetailsById(artistId) {
    try {
        const query = 
        'select\n' + 
        'a.id artist_id, a.name artist_name, a.image artist_image,\n' +
        'null::integer event_id, null event_name, null date,\n' +
        'null venue_name, null "location"\n' +
        'from artist a\n' +
        'where a.id = $1\n' +
        'union\n' +
        'select\n' +
        'null::integer artist_id, null artist_name, null artist_image,\n' +
        'e.id event_id, e.name event_name, e.date,\n' +
        'v.name venue_name, v.location\n' +
        'from event_artist ea\n' +
        'inner join event e on e.id = ea.event_id\n' +
        'inner join venue v on v.id = e.venue_id\n' +
        'where ea.artist_id = $1\n';
        const values = [artistId];
        const getData = await pool.query(query, values);
        return getData.rows;
    } catch (err) {
        console.log("Failed in getArtistDetailsById" + err.message);
    }
}

module.exports = {
    getAllArtists,
    getArtistDetailsById
}