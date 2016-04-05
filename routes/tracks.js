var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.Tracks.findAll().then(function(tracksModel) {
    res.json(tracksModel);
  })
});

module.exports = router;
