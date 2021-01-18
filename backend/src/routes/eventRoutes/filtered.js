const pool = require('../../db')

const byId = async (req, res) => {
    const query = 'select * from event where id = $1';
    const values = [req.params.id];
    try {
      const getData = await pool.query(query, values);
      res.json(getData.rows);
    } catch (err) {
      console.log(err.message);
    }
};

const byArtist = async (req, res) => {
    const query = 'select * from event where LOWER(artist) = $1'
    const values = [req.params.artist.toLowerCase()];
    try {
      const getData = await pool.query(query, values);
      res.json(getData.rows);
    } catch (err) {
      console.log(err.message);
    }
};

module.exports = {
  byId,
  byArtist,
}