var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var callback = function (action) {
    res.json(action);
  };

  var relationsList = [
    {model: models.GpsData, as: 'gps_datas'},
    {model: models.Track, as: 'track'}
  ];

  models.Session.findAll({
    include: [
      {model: models.GpsData, as: 'gps_datas'},
      {model: models.Track, as: 'track'}
    ]}).then(callback)
      .catch(
          function (errors) {
            console.log(errors);
          }
      );
});

router.post('/', function(req, res, next) {
  if (req.body.hasOwnProperty('datas')) {
    var sessionsList = JSON.parse(req.body.datas);

    sessionsList.forEach(function(session) {
      console.log(session);
      models.Session.create(session, {
        include: [
          {model: models.GpsData, as: 'gps_datas'}
        ]
      });
    });
    res.end();
  }
});

module.exports = router;
