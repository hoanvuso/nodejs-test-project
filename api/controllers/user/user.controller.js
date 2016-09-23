'use strict';

var User = require('../../models/user');
var userService = require('../../auth/auth.service');

exports.create = function(req, res) {
  var newUser = new User(req.body);
  newUser.save(function(err, user) {
    if (err) {
      return res.status(422).json(err);
    }

    var token = userService.signToken(user._id);
    res.status(201).json({token: token});
  });
};
