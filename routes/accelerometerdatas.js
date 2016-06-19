var models = require('../models');
var express = require('express');
var router = express.Router();
var utils = require('../common/utils');

router.get('/', function (req, res, next) {
    var callback = function (action) {
        res.json(action);
    };

    var queryOptions = utils.urlFiltersParametersTreatment(req.query, []);

    models.AccelerometerData.findAndCountAll(queryOptions).then(callback)
        .catch(
            function (errors) {
                console.log(errors);
            }
        );
});

router.post('/', function (req, res, next) {
    if (Object.prototype.hasOwnProperty.call(req.body, 'datas')) {
        var accelerometerDatas = JSON.parse(req.body);

        models.AccelerometerData.create(accelerometerDatas)
            .then(function (ad) {
                    res.json(ad);
                }
            );
    }
});

module.exports = router;
