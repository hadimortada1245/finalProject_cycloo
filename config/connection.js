const mysql = require('mysql2');

const con = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cycloo_c',
  port: 3306,
  waitForConnections: true,
  // connectionLimit: 10,
  // idleTimeout: 60000,
  // queueLimit: 0
});
con.getConnection((err, connection) => {
  if (err) {
    console.error('Error getting MySQL connection from pool:', err);
    return;
  }
  console.log('Connected to MySQL');
});

con.on('error', (err) => {
  console.error('MySQL Pool Error:', err);
});
module.exports = con;
