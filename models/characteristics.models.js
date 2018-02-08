'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const characteristicsSchema = mongoose.Schema({
  type: String,
  title: String,
  content: [{type: String}]
});

const Characteristics = mongoose.model('Characteristic', characteristicsSchema);

module.exports = {Characteristics};