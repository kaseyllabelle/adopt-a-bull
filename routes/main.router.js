'use strict';

const express = require('express');
const router = express.Router();
const {Adopters} = require('../models/adopters.model');
const {Puppies} = require('../models/puppies.model');
const {Shelters} = require('../models/shelters.model');
const {Users} = require('../models/users.model');

router.get('/', (req, res) => {
  res.render('main', {userType:'default'});
});

router.get('/:id', (req, res) => {
	Users
	.findById(req.params.id)
	.populate('shelterId')
	// .populate('adoptabullPuppies')
	.populate('adopterId')
	// .populate('favoritePuppies')
	.exec()
	.then(data => {
		console.log(data);
		res.render('main', {userType: data.shelterId ? 'shelter' : 'adopter'});
	});
})

router.post('/adoptabull', (req, res) => {
	Users
	.findByIdAndUpdate(req.body.shelterId, {
		$push:{
			'adoptabullPuppies' : req.body.puppyId
		}
	})
})

router.post('/favorite', (req, res) => {
	Users
	.findByIdAndUpdate(req.body.adopterId, {
		$push:{
			'favoritePuppies' : req.body.puppyId
		}
	})
})

module.exports = router;