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

    return pyshell;
};

utils.endAction = function(pyshell) {
    pyshell.end(function (err) {
        if (err) throw err;
        console.log('finished');
    });
};

module.exports = utils;