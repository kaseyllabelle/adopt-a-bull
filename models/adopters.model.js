'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const adoptersSchema = mongoose.Schema({
  id: String,
  name: String,
  email: String, // how do we make sure it's a valid email address,
  password: String, // how do we store passwords?
  favoritePups: [arrayOfFavoritePups] // how do we get the array of pups an adopter has favorited?
  content: [{type: String}]
});

const Adopters = mongoose.model('Adopter', adoptersSchema);

module.exports = {Adopters};