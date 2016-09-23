'use strict';

const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

var TimeRecordSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: 'User is required'
  },
  date: {
    type: Date,
    required: 'Date is required'
  },
  totalTime: {
    type: Number, //total time in hours
    required: 'Time is required'
  },
  note: String,
  createdAt: Date,
  updatedAt: Date
});

TimeRecordSchema.pre('save', function(next) {
  if (this.isNew) {
    this.createdAt = this.updatedAt = new Date();
  } else {
    this.updatedAt = new Date();
  }

  next();
});

module.exports = mongoose.model('TimeRecord', TimeRecordSchema);