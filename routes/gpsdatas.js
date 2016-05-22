var models = require('../models');
var express = require('express');
var router = express.Router();
var utils = require('../common/utils');

router.get('/', function (req, res, next) {
    var callback = function (action) {
        res.json(action);
    };

    var queryOptions = utils.urlFiltersParametersTreatment(req.query, []);

    models.GpsData.findAll(queryOptions).then(callback)
        .catch(
            function (errors) {
                console.log(errors);
            }
        );
});

module.exports = router;
