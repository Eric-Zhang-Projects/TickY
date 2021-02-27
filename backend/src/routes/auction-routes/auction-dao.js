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

async function getBidsByAuctionId(auction_id, bidder_id) {
  //Returns top 3 bids for an auction, or if current user has an auction shows that auction with user id returned
  const query = 
  'select offer, date_placed, id from bid\n' +
  'where bidder_id = $2 and \n' +
  'is_active is true and auction_id = $1\n' +
  'union\n' +
  '(select offer, date_placed, null id from bid\n' +
  'where bidder_id != $2 and\n' +
  'is_active is true and auction_id = $1\n' +
  'order by offer desc limit 3)'
  const values = [auction_id, bidder_id];
  try {
      const bids = await pool.query(query, values);
      return bids.rows;
    } catch (err) {
      console.log(err.message);
    }
}

async function placeBid(bid){
  const query = 'INSERT INTO bid (id, auction_id, bidder_id, offer, date_placed, is_active) VALUES ($1, $2, $3, $4, $5, $6)';
  const values = Object.values(bid);
  try {
    const bid = await pool.query(query, values);
    return bid.rows;
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
    getAllAuctions,
    getAuctionById,
    getBidsByAuctionId,
    placeBid
}