'use strict';

const express = require('express');
const morgan = require('morgan');
require('dontenv').config();

const { PORT, MONGODB_URI } = require('./config');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Create an Express application
const app = express();

// Log all requests. Skip logging during testing
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'common', {
  skip: () => process.env.NODE_ENV === 'test'
}));

// Create a static webserver
app.use(express.static('public'));

// Parse request body
app.use(express.json());

// Mount routers

// Custom 404 Not Found route handler

// Custom Error Handler

//Prevent mongoose.conect and app.listen from running during tests
if (process.env.NODE_ENV !== 'test') {
  //connect to DB and listen for incoming connections
  mongoose.connect(MONGODB_URI)
    .then(instance => {
      const conn = instance.connections[0];
      console.info(`Connected to: mongodb://${conn.host}:${conn.port}/${conn.name}`);
    })
    .catch(err => {
      console.error(`ERROR: ${err.message}`);
      console.error('\n === Did you remember to start `mongod`? === \n');
      console.error(err);
    });
  
  // Listen for incoming connections
  app.listen(PORT, function () {
    console.info(`Server listening on ${this.address().port}`);
  }).on('error', err => {
    console.error(err);
  });
}

// Export for testing
module.exports = app; 
