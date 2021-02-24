const pool = require('../../db')

async function getAllAuctions() {
    try {
        const auctions = await pool.query('select * from auction order by expiration_date');
        return auctions.rows;
      } catch (err) {
        console.log(err.message);
      }
}

async function getAuctionById(id) {
    const query = 'select * from auction where id = $1';
    const values = [id];
    try {
        const auctions = await pool.query(query, values);
        return auctions.rows;
      } catch (err) {
        console.log(err.message);
      }
}

module.exports = {
    getAllAuctions,
    getAuctionById
}