
const con = require('./config/connection');
const creatingTables = () => {
    con.query(`CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        photo VARCHAR(255),
        phone VARCHAR(20) UNIQUE NOT NULL,
        role VARCHAR(255) NOT NULL DEFAULT 'user',
        address VARCHAR(255) NOT NULL,
        level VARCHAR(25) NOT NULL DEFAULT 'beginner',
       joinedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)`, (error, result) => {
        if (error)
            console.error('Creating users table failed: ' + error);
        else
            console.log('Users table created successfully');
    });
    con.query(`CREATE TABLE IF NOT EXISTS rides (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description longtext NOT NULL,
        distance FLOAT NOT NULL,
        date DATE NOT NULL,
        time VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        difficuly VARCHAR(255) NOT NULL,
        cost INT,
        direction VARCHAR(255),
        duration VARCHAR(255),
        maxMember INT,
        mapImg VARCHAR(255) NOT NULL,
        img VARCHAR(255) NOT NULL,
        status BOOL DEFAULT false
      )`, (error, result) => {
        if (error)
            console.error('Creating rides table failed: ' + error);
        else
            console.log('Rides table created successfully');
    });
    con.query(`CREATE TABLE IF NOT EXISTS ridesJoining (
        ride_id INT,
        user_id INT,
        approved BOOL,
        FOREIGN KEY (ride_id) REFERENCES rides(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
      )`, (error, result) => {
        if (error)
            console.error('Creating ridesJoining table failed: ' + error);
        else
            console.log('RidesJoining table created successfully');
    });
    con.query(`CREATE TABLE IF NOT EXISTS likedRides (
        ride_id INT,
        user_id INT,
        FOREIGN KEY (ride_id) REFERENCES rides(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
      )`, (error, result) => {
        if (error)
            console.error('Creating likedRides table failed: ' + error);
        else
            console.log('LikedRides table created successfully');
    });
    con.query(`CREATE TABLE IF NOT EXISTS ridesReviews (
        ride_id INT,
        user_id INT,
        description VARCHAR(255) NOT NULL,
        rate INT NOT NULL,
        FOREIGN KEY (ride_id) REFERENCES rides(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
      )`, (error, result) => {
        if (error)
            console.error('Creating ridesReviews table failed: ' + error);
        else
            console.log('RidesReviews table created successfully');
    });
    con.query(`CREATE TABLE IF NOT EXISTS reportedRides (
        ride_id INT,
        user_id INT,
        title VARCHAR(255) NOT NULL,
        reason VARCHAR(255) NOT NULL,
        FOREIGN KEY (ride_id) REFERENCES rides(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
      )`, (error, result) => {
        if (error)
            console.error('Creating reportedRides table failed: ' + error);
        else
            console.log('ReportedRides table created successfully');
    });

    con.query(`CREATE TABLE IF NOT EXISTS ridesRequests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        title VARCHAR(255) NOT NULL,
        distance VARCHAR(255) NOT NULL,
        description longtext NOT NULL,
        date DATE NOT NULL,
        time VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        difficuly VARCHAR(255) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE)`, (error, result) => {
        if (error)
            console.error("Creating ridesRequests table failed :" + error)
        else console.log("RidesRequests table created successfully");
    });
    con.query(`CREATE TABLE IF NOT EXISTS orders (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            status BOOL,
            deliver INT,
            createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
          )`, (error, result) => {
        if (error)
            console.error('Creating orders table failed: ' + error);
        else
            console.log('Orders table created successfully');
    });
    con.query(`CREATE TABLE IF NOT EXISTS products (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            type VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            company VARCHAR(255) NOT NULL,
            price INT NOT NULL,
            delivery INT NOT NULL,
            img VARCHAR(255) NOT NULL,
            quantity VARCHAR(255) NOT NULL
            )`, (error, result) => {
        if (error)
            console.error('Creating products table failed: ' + error);
        else
            console.log('Products table created successfully');
    });
    con.query(`CREATE TABLE IF NOT EXISTS orderProducts (
            product_id INT,
            order_id INT,
            FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
            FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE
            )`, (error, result) => {
        if (error)
            console.error('Creating orderProducts table failed: ' + error);
        else
            console.log('OrderProducts table created successfully');
    });
}
module.exports = creatingTables;

