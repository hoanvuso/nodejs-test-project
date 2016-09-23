'use strict';

var Router = require('express').Router;
var controller = require('./user.controller');
var authService = require('../../auth/auth.service');

var router = new Router();

router.post('/', controller.create);
router.get('/me', authService.isAuthenticated(), controller.me);

module.exports = router;
