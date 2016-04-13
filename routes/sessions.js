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

router.post('/', function (req, res, next) {
    if (req.body.hasOwnProperty('datas')) {
        var sessionsList = JSON.parse(req.body.datas);
        var sessionIdsList = [];

        sessionsList.forEach(function (session) {
            // on sauvegarde l'id de la session pour savoir quelles sessions viennent d'être insérer pour vérifier que tout
            // à bien été correctement traité en base
            sessionIdsList.push(session.id);

            //models.Session.create(session, {
            //    include: [
             //       {model: models.GpsData, as: 'gps_datas'}
             //   ]
            //})
        });

        models.sequelize.query("SELECT id FROM session WHERE id in (:idsList)", {
            replacements: {idsList: sessionIdsList},
            type: models.sequelize.QueryTypes.SELECT
        }).then(function(list) {
            console.log(list);
            res.json(list);
        })
    }
});

module.exports = router;
