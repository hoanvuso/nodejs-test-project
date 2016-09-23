/**
 * Main application routes
 */

'use strict';
var path = require('path');
var config = require('./config');

module.exports = function(app) {
  // Insert routes below
  app.use('/api/auth', require('./auth'));
  app.use('/api/users', require('./controllers/user'));
  app.use('/api/records', require('./controllers/time-record'));

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(config.rootDir + '/front/index.html'));
    });
}
