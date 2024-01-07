const mysql=require('mysql2');
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cycloo',
  port: 3306
});

con.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});
module.exports = con;