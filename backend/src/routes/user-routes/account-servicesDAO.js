const pool = require('../../db');

async function uploadTicket(ticket, auction, relation) {
    const ticketQuery = "INSERT INTO ticket (id, seating_area, data, picture) VALUES ($1, $2, $3, $4)";
    const ticketValues = Object.values(ticket);
    const auctionQuery = "INSERT INTO auction (id, winning_bid_id, name, description, is_closed, expiration_date, ask_price, ticket_quantity) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
    const auctionValues = Object.values(auction);
    const relationQuery = "INSERT INTO user_ticket_event_auction (user_id, ticket_id, event_id, auction_id) VALUES ($1, $2, $3, $4)";
    const relationValues = Object.values(relation); 
    // console.log(ticketValues);
    // console.log(auctionValues);
    // console.log(relationValues);
    try {
        await pool.query('BEGIN');
        const ticketRes = await pool.query(ticketQuery, ticketValues);
        const auctionRes = await pool.query(auctionQuery, auctionValues);
        const relationRes = await pool.query(relationQuery, relationValues);
        await pool.query('COMMIT');
        return;
    } catch (err) {
        await pool.query('ROLLBACK');
        console.log(err + " failed to upload ticket");
        return err;
    }
}

async function onboardSeller(seller){
    try {
        const query = 
        'UPDATE users SET\n' +
        'name = $1,\n' +
        'seller_rating = 5.0,\n' +
        'customer_id = $2\n' +
        'WHERE id = $3';
        await pool.query('BEGIN');
        const values = [seller.name, seller.customer_id, seller.id];
        const onboardSeller = await pool.query(query, values);
        await pool.query('COMMIT');
        return onboardSeller.rowCount;
    } catch (err) {
        await pool.query('ROLLBACK');
        console.log(err + " failed to onboard new seller");
        return err;
    }
}

module.exports = {
    uploadTicket,
    onboardSeller
}