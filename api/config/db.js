const mysql2 = require("mysql2");

const db = mysql2.createConnection({
    'host': '89.117.7.204',
    'user': 'u296765781_john',
    'password': '28Liverpo@@',
    'database': 'u296765781_john_finance'
});

module.exports = db;
