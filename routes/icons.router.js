'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('icons', {userType:'default'});
});

module.exports = router;