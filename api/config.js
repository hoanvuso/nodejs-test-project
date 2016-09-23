'use strict';
var path = require('path');

// Development specific configuration
// ==================================
module.exports = {
  port: 9000,
  ip: null, //specific ip for express setting

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/test-app-dev'
    //more option can see in the mongoose doc
  },

  rootDir: path.resolve(__dirname + '/../')
};
