var models = require('../models');
var express = require('express');
var utils = require('../common/utils')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.Track.findAll().then(function(tracksModel) {
    res.json(tracksModel);
  })
});

router.post('/', function(req, res, next) {
  var track = JSON.parse(JSON.stringify(req.body));

  models.Track.create(track)
    .then(function(trackModel) {
      res.json(trackModel);
    }
  );
});

router.post('/execute', function(req, res, next) {
  var trackId = JSON.parse(JSON.stringify(req.body));
console.log(trackId);
  utils.executeAction("main.py", [trackId]);
});

module.exports = router;
