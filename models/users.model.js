'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const usersSchema = mongoose.Schema({
  email: String,
  password: String,
  shelterId: {
  	type: mongoose.Schema.ObjectId, ref: 'Shelters'
  },
  adopterId: {
  	type: mongoose.Schema.ObjectId, ref: 'Adopters'
  }
});

const Users = mongoose.model('User', usersSchema);

module.exports = {Users};