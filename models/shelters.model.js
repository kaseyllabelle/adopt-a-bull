'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const sheltersSchema = mongoose.Schema({
  name: String,
  address: String,
  telephone: Number,
  email: String,
  adoptabullPuppies: [{
  	type: mongoose.Schema.ObjectId, ref: 'Puppies'
  }]
});

const Shelters = mongoose.model('Shelter', sheltersSchema);

module.exports = {Shelters};