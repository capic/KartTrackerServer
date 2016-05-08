var models = require('../models');
var express = require('express');
var utils = require('../common/utils')
var router = express.Router();
var moment = require('moment');

var pyshell = null;

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.Track.findAll().then(function(tracksModel) {
    res.json(tracksModel);
  })
});

router.get('/withInfos', function(res, res, next) {
  var promises = [];
  models.Track.findAll().then(function(trackModelList) {
    var tracksListReturned = [];
    var today = new Date();

    trackModelList.forEach(function(track) {
      var promise = models.Session.count({where: {track_id: track.id, date_session: models.sequelize.fn('date', "now") }}).then(function(result) {
        track.dataValues.sessions_count = result;

        tracksListReturned.push(track);
      });

      promises.push(promise);

      Promise.all(promises).then(function() {
        res.json(tracksListReturned);
      });
    });
  });
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

  var params = [trackId];
  pyshell = utils.executeAction("main.py", params);

  res.send();
});

router.post('/stop', function(req, res, next) {
  utils.endAction(pyshell);
  res.send();
});

module.exports = router;
