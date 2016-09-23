'use strict';

var Router = require('express').Router;
var controller = require('./time-record.controller');
var authService = require('../../auth/auth.service');

var router = new Router();

router.post('/', authService.isAuthenticated(), controller.create);
router.put('/:id', authService.isAuthenticated(), controller.update);
router.delete('/:id', authService.isAuthenticated(), controller.remove);
router.get('/', authService.isAuthenticated(), controller.findAll);

module.exports = router;
