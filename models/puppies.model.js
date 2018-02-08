'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const puppiesSchema = mongoose.Schema({
  id: String,
  photo: String, // is this the right type?
  name: String,
  gender: String,
  age: Number,
  size: String,
  biography: String,
  shelterId: String,
  distance: String // how do we collect the mileage/distance between the pup and the adopter?
});

const Puppies = mongoose.model('Puppy', puppiesSchema);

module.exports = {Puppies};