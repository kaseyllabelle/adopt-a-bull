'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const sheltersSchema = mongoose.Schema({
  name: String,
  address: {
  	building: String,
  	street: String,
  	city: String,
  	state: String,
  	zipcode: String
  },
  telephone: String,
  email: String,
  _creator: {
    type: mongoose.Schema.ObjectId, 
    ref: 'Users', 
    required: true
  },
  adoptabullPuppies: [{
  	type: mongoose.Schema.ObjectId, ref: 'Puppies'
  }]
});

const Shelters = mongoose.model('Shelter', sheltersSchema);

module.exports = {Shelters};