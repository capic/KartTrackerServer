/**
 * Created by Vincent on 13/11/2015.
 */
var PythonShell = require('python-shell');

var utils = {};

utils.executeAction = function (action, parametersList) {
    var options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: "/home/pi/KartTracker/",
        args: ['value1', 'value2', 'value3']
    };

    PythonShell.run(action, options, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        console.log('results: %j', results);
    });
};

module.exports = utils;