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

router.post('/list', function (req, res, next) {
  if (req.body.hasOwnProperty('datas')) {
    var tracksList = JSON.parse(req.body.datas);
    var trackIdsList = [];

    tracksList.forEach(function (track) {
      // on sauvegarde l'id du track pour savoir quelles track viennent d'être insérer pour vérifier que tout
      // à bien été correctement traité en base
      trackIdsList.push(track.id);

      models.Track.create(track);
    });

    models.sequelize.query("SELECT id FROM track WHERE id in (:idsList)", {
      replacements: {idsList: trackIdsList},
      type: models.sequelize.QueryTypes.SELECT
    }).then(function(list) {
      res.json(list);
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
