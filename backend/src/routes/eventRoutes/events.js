const pool = require('../../db')

const all = async (req, res) => {
  try {
    const getData = await pool.query('select * from event');
    res.json(getData.rows);
  } catch (err) {
    console.log(err.message);
  }
};

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

module.exports = {
  all,
  byId,
}