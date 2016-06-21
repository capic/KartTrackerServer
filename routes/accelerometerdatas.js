var models = require('../models');
var express = require('express');
var router = express.Router();
var utils = require('../common/utils');

router.get('/', function (req, res, next) {
    var callback = function (action) {
        console.log(action);
        res.json(action);
    };

    var queryOptions = utils.urlFiltersParametersTreatment(req.query, []);

    models.AccelerometerData.count(queryOptions.where).then(function(c) {
        models.AccelerometerData.findAll(queryOptions).then(function(accelerometer) {
            var ret = {};
            ret.count = c;
            ret.rows = accelerometer

            res.json(ret);
        })
            .catch(
                function (errors) {
                    console.log(errors);
                }
            );
    });


});

router.post('/', function (req, res, next) {
    if (Object.prototype.hasOwnProperty.call(req.body, 'datas')) {
        var accelerometerDatas = JSON.parse(req.body.datas);

        models.AccelerometerData.create(accelerometerDatas)
            .then(function (ad) {
                    res.json(ad);
                }
            );
    }
});

module.exports = router;
