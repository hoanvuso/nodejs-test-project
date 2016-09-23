/**
 * Main application routes
 */

'use strict';

module.exports = function(app) {
  // Insert routes below
  app.use('/api/auth', require('./auth'));
  app.use('/api/users', require('./controllers/user'));
  app.use('/api/records', require('./controllers/time-record'));
}
