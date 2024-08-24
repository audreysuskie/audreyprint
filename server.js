const mongoose = require('mongoose');
require('dotenv').config();
const mongoString = process.env.DATABASE_URL;
const PORT = process.env.PORT || 3000;

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('💥Uncaught Exception💥! Shutting down...');
  process.exit(1);
});

mongoose.set('strictQuery', false).connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database is now connected!');
});

const app = require('./app');

//Start the Server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('💥Unhandled Rejection💥! Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED! Shutting down gracefully...');
  server.close(() => {
    console.log('💥Process terminated!💥');
  });
});
