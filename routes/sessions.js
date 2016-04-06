var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET users listing. */
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
