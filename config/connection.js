const mysql = require('mysql2');

const con = mysql.createPool({
  host: 'bslr3zx5a4ob8evv86os-mysql.services.clever-cloud.com',
  user: 'uwfenqkuwadtbqqy',
  password: 'p9mO1EcDGxDVAUG2I4Sy',
  database: 'bslr3zx5a4ob8evv86os',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
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
