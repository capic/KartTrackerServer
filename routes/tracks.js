var models = require('../models');
var express = require('express');
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

module.exports = router;
