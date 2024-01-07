require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
// const creatingTables = require('./setup');
const usersRoutes = require('./routes/users.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 5000;

try {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    // creatingTables();
  });

  app.use('/users', usersRoutes);
} catch (error) {
  console.error('Error starting the server:', error);
}
