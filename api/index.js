'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http');
const config = require('./config');

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

//express config
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(express.static(path.resolve(config.rootDir + '/front')));

require('./routes')(app);

var server = http.createServer(app);
server.listen(config.port, config.ip, function() {
  console.log('Server listening on %d', config.port);
});

// Expose app
// can use for testing as example
exports = module.exports = app;