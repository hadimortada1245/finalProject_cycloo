require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const creatingTables = require('./setup');
const usersRoutes = require('./routes/users.js');
const ridesRoutes = require('./routes/rides.js');
const likedRidesRoutes = require('./routes/likedRides.js');
const ridesRequestsRoutes = require('./routes/ridesRequests.js');
const ridesJoiningRoutes = require('./routes/ridesJoining.js');
const ridesReviewsRoutes = require('./routes/ridesReviews.js');
const ridesReportsRoutes = require('./routes/ridesRports.js');
const productsRoutes = require('./routes/products.js');
const ordersRoutes = require('./routes/orders.js');
const orderProductsRoutes = require('./routes/orderProducts.js');
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
  app.use('/rides', ridesRoutes);
  app.use('/likedRides', likedRidesRoutes);
  app.use('/ridesRequests', ridesRequestsRoutes);
  app.use('/ridesJoining', ridesJoiningRoutes);
  app.use('/ridesReviews', ridesReviewsRoutes);
  app.use('/ridesReports', ridesReportsRoutes);
  app.use('/products', productsRoutes);
  app.use('/orders', ordersRoutes);
  app.use('/orderProducts', orderProductsRoutes);
} catch (error) {
  console.error('Error starting the server:', error);
}
