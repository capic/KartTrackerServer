var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
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
        ]
    }).then(callback)
        .catch(
            function (errors) {
                console.log(errors);
            }
        );
});

router.post('/list', function(req, res, next) {
    if (req.body.hasOwnProperty('datas')) {
        var sessionsList = JSON.parse(req.body.datas);
        var sessionIdsList = [];

        var promises = [];
        sessionsList.forEach(function (session) {
            var newPromise = models.Session.findOrCreate({where: {id: session.id}, defaults: session}/*, {
                include: [
                    {model: models.GpsData, as: 'gps_datas'}
                ]
            }*/);
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
