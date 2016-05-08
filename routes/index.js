var express = require('express');
var utils = require('../common/utils');
var router = express.Router();

var pyshell = null;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/synchronise', function(req, res, next) {
  var params = ['-s'];
  pyshell = utils.executeAction("main.py", params);

  res.end();
});

module.exports = router;
