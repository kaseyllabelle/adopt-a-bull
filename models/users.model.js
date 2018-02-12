'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const usersSchema = mongoose.Schema({
  created: {
  	type: Date, default: Date.now
  },
  email: String,
  password: String,
  shelterId: {
  	type: mongoose.Schema.ObjectId, ref: 'Shelters'
  },
  adopterId: {
  	type: mongoose.Schema.ObjectId, ref: 'Adopters'
  }, 
  active: {
    type: Boolean,
    default: true
  }
});

const Users = mongoose.model('User', usersSchema);

module.exports = {Users};