var models = require('../models');
var express = require('express');
var utils = require('../common/utils');
var router = express.Router();

var pyshell = null;

/* GET users listing. */
router.get('/', function (req, res, next) {
    var relationsList = [];
    var queryOptions = utils.urlFiltersParametersTreatment(req.query, relationsList);
    queryOptions.order = ['name', 'ASC'];

    models.Track.findAll(queryOptions).then(function (tracksModel) {
        res.json(tracksModel);
    })
});

router.get('/withInfos', function (res, res, next) {
    var tracksListReturned = [];
    var promises = [];
    models.Track.findAll(
        {
            include: [{
                model: models.Session,
                attributes: [[models.sequelize.fn('COUNT', 'id'), 'sessions_count_today']],
                where: {date_session: models.sequelize.fn('date', "now")},
                required: false
            }]
        }
    ).then(function (trackModelList) {
        trackModelList.forEach(function (track) {
            var promise = models.Session.count({where: {track_id: track.id}}).then(function (result) {
                track.dataValues.sessions_count_total = result;
                tracksListReturned.push(track)
            });
            promises.push(promise);
        });

        Promise.all(promises).then(function () {
            res.json(tracksListReturned);
        });
    });
});

router.post('/', function (req, res, next) {
    var track = JSON.parse(JSON.stringify(req.body));
    track.new = true;

    models.Track.create(track)
        .then(function (trackModel) {
                res.json(trackModel);
            }
        );
});

router.post('/list', function (req, res, next) {
    if (req.body.hasOwnProperty('datas')) {
        var tracksList = JSON.parse(req.body.datas);

        var promises = [];
        tracksList.forEach(function (track) {
            var newPromise = models.Track.findOrCreate({where: {id: track.id}, defaults: track});
            promises.push(newPromise);
        });

        Promise.all(promises).then(function (tracks) {
            res.json(tracks);
        });
    }
});

router.post('/execute', function (req, res, next) {
    var trackId = JSON.parse(JSON.stringify(req.body)).id;

    var params = [trackId];
    pyshell = utils.executeAction("main.py", params);

    res.send();
});

router.post('/stop', function (req, res, next) {
    utils.endAction(pyshell);
    res.send();
});

router.delete('/:id', function (req, res, next) {
    models.Track.destroy({where: {id: req.params.id}})
        .then(function (ret) {
                res.json({'return': ret == 1});
            }
        );
});

module.exports = router;
