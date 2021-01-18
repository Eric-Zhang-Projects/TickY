const fs = require('fs');

let rawdata = fs.readFileSync('C:/Users/zhang/Desktop/Coding/Secrets/TickYSecrets.json');
let data = JSON.parse(rawdata);
module.exports.db = {
    'user': data.db_user,
    'host': data.db_host,
    'password': data.db_password,
    'database': data.db_database,
    'port': data.db_port
}
module.exports.port = 5000;
module.exports.edm_train_api_key = data.edm_train_api_key;