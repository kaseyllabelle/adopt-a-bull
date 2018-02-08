'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const puppiesSchema = mongoose.Schema({
  created: {
    type: Date, default: Date.now
  },
  photo: String,
  name: String,
  gender: String,
  age: Number,
  size: String,
  biography: String,
  shelterId: {
  	type: mongoose.Schema.ObjectId, ref: 'Shelters'
  },
  distance: String
});

const Puppies = mongoose.model('Puppy', puppiesSchema);

module.exports = {Puppies};