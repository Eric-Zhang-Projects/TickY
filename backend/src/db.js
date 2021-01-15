const Pool = require('pg').Pool;
const { db } = require('./secrets.js')

const pool = new Pool({
    user: db.user,
    host: db.host,
    password: db.password,
    database: db.database,
    port: db.port
})

module.exports = pool;