'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('landing', {logIn:'sign-in'});
});

router.get('/:logIn', (req, res) => {
  res.render('landing', {logIn: req.params.logIn});
});

module.exports = router;