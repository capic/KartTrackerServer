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

utils.urlFiltersParametersTreatment = function (queryParameters, relationsList) {
    var tabQuery = [];
    var params = {};
    var queryOptions = {};

    for (var prop in queryParameters) {
        var elValue = parameterTypeTreatment(queryParameters[prop]);
        if (elValue != null) {
            if (prop.startsWith("_")) {
                sequelizeParameterTreatment(prop, queryParameters, queryOptions);
            } else {
                queryParameterTreatment(prop, queryParameters, elValue, relationsList, tabQuery, params);
            }
        }
    }

    tabQuery.forEach(function (el) {
        var k = Object.keys(el);
        params[k[0]] = el[k[0]];
    });

    queryOptions['where'] = params;
    queryOptions['include'] = relationsList;

    return queryOptions;
};

var sequelizeParameterTreatment = function(prop, queryParameters, queryOptions) {
    if (prop == "_limit") {
        queryOptions['limit'] = parseInt(queryParameters[prop], 10);
    } else if (prop == "_offset") {
        queryOptions['offset'] = parseInt(queryParameters[prop], 10);
    } else if (prop == "_order") {
        queryOptions['order'] = queryParameters[prop];
    }
};

var queryParameterTreatment = function (prop, queryParameters, elValue, relationsList, tabQuery, params) {
    var tabOperator = prop.split("$");
    if (tabOperator.length > 1) {
        var tabOperatorNum = tabOperator[1].split("µ");
        if (tabOperatorNum[0] == "or") {
            var p = {};
            p[tabOperator[0]] = elValue;

            if (tabQuery.hasOwnProperty(tabOperatorNum[1])) {
                tabQuery[tabOperatorNum[1]]['$or'].push(p);
            } else {
                var op = {};
                op['$or'] = [];
                op['$or'].push(p);
                tabQuery[tabOperatorNum[1]] = op;
            }
        }
    } else {
        if (prop.indexOf('.') > -1) {
            includeTreatment(queryParameters, prop, elValue, relationsList);
        } else {
            params[prop] = elValue;
        }
    }
};

var includeTreatment = function (queryParameters, prop, elValue, relationsList) {
    var found = false;
    var i = 0;
    while (i < relationsList.length && !found) {
        var tabRelations = prop.split('.');

        if (Array.isArray(relationsList[i])) {
            return includeTreatment(queryParameters, prop, elValue, relationsList[i]);
        } else {
            if (relationsList[i].as == tabRelations[0]) {
                found = true;
                var whereObject = {};
                whereObject[tabRelations[1]] = elValue;
                relationsList[i].where = whereObject;
            }
        }
        i++;
    }
};

var parameterTypeTreatment = function (param) {
    var ret = null;

    if (param == 'true' || param == 'false') {
        ret = (param === 'true');
    } else {
        ret = param;
    }

    return ret;
};

module.exports = utils;