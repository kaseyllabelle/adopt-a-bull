let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
  res.render('main', {accountType:'default'});
});

router.get('/:accountType', (req, res) => {
  console.log(req.params);
  res.render('main', {accountType: req.params.accountType});
});

module.exports = router;