var models = require('../models');
var express = require('express');
var router = express.Router();
var utils = require('../common/utils');

router.get('/', function (req, res, next) {
    var callback = function (action) {
        res.json(action);
    };

    var queryOptions = utils.urlFiltersParametersTreatment(req.query, []);

    models.GpsData.findAndCountAll(queryOptions).then(callback)
        .catch(
            function (errors) {
                console.log(errors);
            }
        );
});

router.get('/maxDistance', function(req,res){
    models.GpsData.query("SELECT max(latitude) - min(latitude) as maxDistanceLatitude, " +
        "max(longitude) - min(longitude) as maxDistanceLongitude " +
        "from gps_data " +
        "where session_id = :sessionId",
        {replacements: {sessionId: req.query.sessionId}, type: models.sequelize.QueryTypes.SELECT })
        .then(function(result) {
            res.json(result.maxDistanceLatitude > result.maxDistanceLongitude ? result.maxDistanceLatitude : result.maxDistanceLongitude);
    });
});

module.exports = router;
