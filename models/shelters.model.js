'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const sheltersSchema = mongoose.Schema({
  id: String,
  name: String,
  address: String,
  telephone: Number,
  email: String,
  puppies: [ids] // how do we get the array of puppy ids for each shelter?
});

const Shelters = mongoose.model('Shelter', sheltersSchema);

module.exports = {Shelters};