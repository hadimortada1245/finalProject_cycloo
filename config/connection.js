const mysql = require('mysql2');
const con = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cycloo',
});

module.exports = con;