const pool = require('../../db');

async function registerUser(user) {
    const query = "INSERT INTO users (id, email, password) VALUES ($1, $2, $3)";
    const values = [user.id, user.email, user.password];
    try {
        const data = await pool.query(query, values);
        return data.rows;
    } catch (err) {
        console.log(err + "failed to register user");
        return err;
    }
}

async function getUserByEmail(email) {
    const query = "SELECT * from users where email = $1"
    const values = [email];
    try {
        const data = await pool.query(query, values);
        return data.rows[0];
    } catch (err) { 
        console.log(err + " Failed to get user by email: " + email);
    }
}

async function getUserById(id) {
    const query = "SELECT * from users where id = $1"
    const values = [id];
    try {
        const data = await pool.query(query, values);
        return data.rows[0];
    } catch (err) { 
        console.log(err + " Failed to get user by ID: " + id);
    }
}

module.exports = {
    registerUser,
    getUserByEmail,
    getUserById
}