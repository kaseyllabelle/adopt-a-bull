'use strict';

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {Users} = require('../models/users.model');

// add user
router.post('/', (req, res) => {
  const newUser = {
  	email: req.body.email,
  	password: req.body.password,
  	shelterId: new mongoose.Types.ObjectId()
  };
  Users.create(newUser).then(response => {
 		res.redirect('/user/' + response._id);
  });
});

// get user
router.get('/:userId', (req, res) => {
  Users.findById(req.params.userId).exec().then(userData => {
  	console.log(userData);
  	res.render('user', {userData});
  });
});

module.exports = router;