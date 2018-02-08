'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const adoptersSchema = mongoose.Schema({
  location: String,
  discoverySettings: {
  	distance: String,
  	gender: String,
  	age: String,
  	size: String
  },
  favoritePups: [{
  	type: mongoose.Schema.ObjectId, ref: 'Puppies'
  }]
});

const Adopters = mongoose.model('Adopter', adoptersSchema);

module.exports = {Adopters};