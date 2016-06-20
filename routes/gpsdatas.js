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

router.post('/', function (req, res, next) {
    if (Object.prototype.hasOwnProperty.call(req.body, 'datas')) {
        var gpsDatas = JSON.parse(req.body);
        console.log(gpsDatas);
        models.GpsData.create(gpsDatas)
            .then(function (gd) {
                    res.json(gd);
                }
            );
    }
});

router.get('/maxMinCoordinates', function(req,res){
    models.GpsData.query("SELECT max(latitude) as maxLatitude, min(latitude) as maxDistanceLatitude, " +
        "max(longitude) - min(longitude) as maxDistanceLongitude " +
        "from gps_data " +
        "where session_id = :sessionId",
        {replacements: {sessionId: req.query.session_id}, type: models.sequelize.QueryTypes.SELECT })
        .then(function(result) {
            res.json({distance: result.maxDistanceLatitude > result.maxDistanceLongitude ? result.maxDistanceLatitude : result.maxDistanceLongitude});
    });
});

module.exports = router;
