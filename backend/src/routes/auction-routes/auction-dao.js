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
    const query =
    'select\n' +
    'a.id auction_id, a.name auction_name, a.description auction_description, a.is_closed, a.expiration_date, a.ask_price, a.ticket_quantity,\n' +
    'r.event_id,\n' +
    't.seating_area, t.data ticket_data,\n' +
    'u.name, u.seller_rating\n' +
    'from auction a\n' +
    'inner join user_ticket_event_auction r on r.auction_id = a.id\n' +
    'inner join ticket t on t.id = r.ticket_id\n' +
    'inner join users u on u.id = r.user_id\n' +
    'where a.id = $1';
    const values = [id];
    try {
        const auctions = await pool.query(query, values);
        return auctions.rows;
      } catch (err) {
        console.log(err.message);
      }
}

async function getBidsByAuctionId(id) {
  const query = 'select offer, date_placed from bid where is_active is true and auction_id = $1 order by offer desc limit 5';
  const values = [id];
  try {
      const bids = await pool.query(query, values);
      return bids.rows;
    } catch (err) {
      console.log(err.message);
    }
}

module.exports = {
    getAllAuctions,
    getAuctionById,
    getBidsByAuctionId
}