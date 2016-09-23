'use strict';

var _ = require('lodash');
var TimeRecord = require('../../models/time-record');

function handleError(res, err, statusCode) {
  statusCode = statusCode || 500;
  return res.status(statusCode).send(err);;
}

function handleEntityNotFound(res) {
  return res.status(404).end();
}

/**
 * create new entity
 * restricted: authorized user
 */
exports.create = function(req, res) {
  var newItem = new TimeRecord(req.body);
  newItem.userId = req.user._id;
  newItem.save(function(err, item) {
    if (err) {
      return res.status(422).json(err);
    }

    res.status(201).json(item);
  });
};

/**
 * update single item
 * restricted: item owner
 */
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  TimeRecord.findById(req.params.id, function(err, entity) {
    if (err) { return handleError(res, err); }
    if (!entity) { return handleEntityNotFound(res); }

    //check user permission
    if (entity.userId.toString() !== req.user._id.toString()) {
      return handleError(res, 'Forbidden', 403);
    }
    var updated = _.merge(entity, req.body);
    updated.save(function(err) {
      if (err) { return handleError(res, err); }

      return res.status(200).json(updated);
    });
  });
};

/**
 * delete single item
 * restricted: item owner
 */
exports.remove = function(req, res) {
  TimeRecord.findById(req.params.id, function(err, entity) {
    if (err) { return handleError(res, err); }
    if (!entity) { return handleEntityNotFound(res); }

    //check user permission
    if (entity.userId.toString() !== req.user._id.toString()) {
      return handleError(res, 'Forbidden', 403);
    }

    entity.remove(function(err) {
      if (err) { return handleError(res, err); }

      return res.status(200).end();
    });
  });
};

/**
 * find all items by logged in user
 * restricted: item owner
 */
exports.findAll = function(req, res) {
  TimeRecord.find({}).sort('-date').exec(function(err, entities) {
    if (err) { return handleError(res, err); }

    return res.status(200).json(entities);
  });
};