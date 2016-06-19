var models = require('../models');
var express = require('express');
var router = express.Router();
var utils = require('../common/utils');

router.get('/', function (req, res, next) {
    var callback = function (action) {
        res.json(action);
    };

    var queryOptions = utils.urlFiltersParametersTreatment(req.query, []);

    models.Session.findAll(queryOptions).then(callback)
        .catch(
            function (errors) {
                console.log(errors);
            }
        );
});

/* GET users listing. */
router.get('/withInfos', function (req, res, next) {
    var callback = function (sessions) {
        res.json(sessions);
    };

    var relationsList = [
        {model: models.GpsData, as: 'gps_datas'},
        {model: models.AccelerometerData, as: 'accelerometer_datas'},
        {model: models.Track, as: 'track'}
    ];

    var queryOptions = utils.urlFiltersParametersTreatment(req.query, relationsList);

    models.Session.findAll(queryOptions).then(callback)
        .catch(
            function (errors) {
                console.log(errors);
            }
        );
});

router.get('/:id/withInfos', function (req, res, next) {
    models.Session.findById(req.params.id, {
        include: [
            {model: models.GpsData, as: 'gps_datas'},
            {model: models.AccelerometerData, as: 'accelerometer_datas'}
        ]
    }).then(function (sessionModel) {
            res.json(sessionModel);
        }
    );
});

router.get('/currentList', function(req, res, next) {
    models.Session.findAll({where: {end_time: null}})
        .then(function(sessionsList) {
            res.json(sessionsList);
        }
    );
});

router.post('/', function (req, res, next) {
    var session = JSON.parse(JSON.stringify(req.body.datas));
    console.log(session);
    models.Session.create(session)
        .then(function (s) {
                res.json(s);
            }
        );
});

router.post('/list', function(req, res, next) {
    if (Object.prototype.hasOwnProperty.call(req.body, 'datas')) {
        var sessionsList = JSON.parse(req.body.datas);

        var promises = [];
        sessionsList.forEach(function (session) {
            var newPromise = models.Session.create(session, {
                include: [
                    {model: models.GpsData, as: 'gps_datas'},
                    {model: models.AccelerometerData, as: 'accelerometer_datas'}
                ]
            });
            promises.push(newPromise);
        });

        Promise.all(promises).then(function(sessions) {
            res.json(sessions);
        });

        //models.sequelize.query("SELECT id FROM session WHERE id in (:idsList)", {
        //    replacements: {idsList: sessionIdsList},
        //    type: models.sequelize.QueryTypes.SELECT
        //}).then(function(list) {
        //    console.log(list);
        //    res.json(list);
        //});
    }
});

module.exports = router;
