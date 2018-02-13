'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('landing', {logIn:'sign-up'});
});

router.get('/:logIn', (req, res) => {
  res.render('landing', {logIn: req.params.logIn});
});

module.exports = router;