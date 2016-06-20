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
        var gpsDatas = JSON.parse(req.body.datas);

        models.GpsData.create(gpsDatas)
            .then(function (gd) {
                    res.json(gd);
                }
            );
    }
});

router.get('/maxMinCoordinates', function(req,res){
    models.sequelize.query("SELECT max(latitude) as maxLatitude, min(latitude) as minLatitude, " +
        "max(longitude) as maxLongitude, min(longitude) as minLongitude " +
        "from gps_data " +
        "where session_id = :sessionId",
        {replacements: {sessionId: req.query.session_id}, type: models.sequelize.QueryTypes.SELECT })
        .then(function(result) {
            res.json(result);
    });
});

module.exports = router;
