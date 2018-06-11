'use strict';

module.exports = {
  PORT: process.env.PORT || 8080,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/birthdays',
  TEST_MONGODB_URI: process.env.TEST_MONGODB_URI || 'mongodb://localhost/birthday-test'
};