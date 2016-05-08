/**
 * Created by Vincent on 13/11/2015.
 */
var PythonShell = require('python-shell');

var utils = {};

utils.executeAction = function (action, parametersList) {
    var options = {
        mode: 'text',
        scriptPath: "/home/pi/KartTracker/",
        args: parametersList
    };

    var pyshell = new PythonShell(action, options);

    pyshell.on('message', function (message) {
        console.log(message);
    });

    pyshell.on('error', function (error) {
        console.log(error);
    });
    return pyshell;
};

utils.endAction = function(pyshell) {
    pyshell.end(function (err) {
        if (err) throw err;
        console.log('finished');
    });
};

module.exports = utils;