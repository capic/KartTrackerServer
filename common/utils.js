/**
 * Created by Vincent on 13/11/2015.
 */
var spawn = require('child_process').spawn;

var utils = {};

utils.executeAction = function (action, parametersList) {
    try {
        var execAction = spawn(action, parametersList);

        execAction.stdout.on('data',
            function (data) {
                console.log(data.toString());
            }
        );
        execAction.stderr.on('data',
            function (data) {
                console.log(data.toString());
            }
        );
        execAction.on('error', function (err) {
            //console.log('Failed to start child process.' + err);
        });
        execAction.on('close', function (code) {
            //console.log('child process exited with code ' + code);
        });
    } catch (ex) {
        console.log(ex);
    }
};

module.exports = utils;