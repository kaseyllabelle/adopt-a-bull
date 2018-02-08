let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
  res.render('log-in', {accountType:'default'});
});

router.get('/:accountType', (req, res) => {
  console.log(req.params);
  res.render('log-in', {accountType: req.params.accountType});
});

module.exports = router;