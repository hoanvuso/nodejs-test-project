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

exports.me = function(req, res) {
  User.findOne({ _id: req.user._id }, '-salt -password', function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    if (!data) {
      return res.status(401).end();
    }
    res.status(200).json(data);
  });
};