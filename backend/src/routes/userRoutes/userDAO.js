const pool = require('../../db');

async function registerUser(user) {
    const query = "INSERT INTO users (username, password, email) VALUES ($1, $2, $3)";
    const values = [user.username, user.password, user.email];
    try {
        const data = await pool.query(query, values);
        return data.rows;
    } catch (err) {
        console.log(err + "failed to register user");
        return err;
    }
}

async function getUserByUsername(username) {
    const query = "SELECT * from users where username = $1"
    const values = [username];
    try {
        const data = await pool.query(query, values);
        return data.rows[0];
    } catch (err) { 
        console.log(err + " Failed to get user by username: " + username);
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
    getUserByUsername
}