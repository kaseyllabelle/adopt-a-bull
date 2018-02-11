'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('main', {userType:'default'});
});

router.get('/:userType', (req, res) => {
  console.log(req.params);
  res.render('main', {userType: req.params.userType});
});

module.exports = router;