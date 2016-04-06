var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var callback = function (action) {
    res.json(action);
  };

  var relationsList = [
    {model: models.GpsData, as: 'gps_data'},
    {model: models.Track, as: 'track'}
  ];

  models.Session.findAll({
    include: [
      {model: models.GpsData, as: 'gps_data'},
      {model: models.Track, as: 'track'}
    ]}).then(callback)
      .catch(
          function (errors) {
            console.log(errors);
          }
      );
});

router.post('/', function(req, res, next) {
  var sessionsList = JSON.parse(JSON.stringify(req.body));

  sessionsList.forEach(function(session){
    models.Session.create(session,{
      include: [
        {model: models.GpsData, as: 'gps_data'}
      ]
    })
  });
});

module.exports = router;
