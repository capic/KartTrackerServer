/**
 * Created by Vincent on 27/08/2015.
 */
var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
var config    = require("../configuration");
var dbConfig  = config.get('db');

if (dbConfig.dialect == "sqlite") {
  var sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {host: dbConfig.host, dialect: dbConfig.dialect, storage: dbConfig.storage});
} else {
  var sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {host: dbConfig.host, dialect: dbConfig.dialect, logging: true});
}

var db        = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;