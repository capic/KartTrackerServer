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
  track.new = true;

  models.Track.create(track)
    .then(function(trackModel) {
      res.json(trackModel);
    }
  );
});

router.post('/list', function (req, res, next) {
  if (req.body.hasOwnProperty('datas')) {
    var tracksList = JSON.parse(req.body.datas);
    var trackIdsList = [];

    var promises = [];
    tracksList.forEach(function (track) {
      var newPromise = models.Track.findOrCreate({where: {id: track.id}, defaults: track});
      promises.push(newPromise);
    });

    Promise.all(promises).then(function(tracks) {
      res.json(tracks);
    });
  }
});

router.post('/execute', function(req, res, next) {
  var trackId = JSON.parse(JSON.stringify(req.body)).id;

  var params = new Array();
  params.push(trackId)
  utils.executeAction("main.py", params);

  res.send();
});

module.exports = router;
