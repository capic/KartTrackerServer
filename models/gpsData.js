/**
 * Created by Vincent on 27/08/2015.
 */
module.exports = function(sequelize, DataTypes) {
  var GpsData = sequelize.define('GpsData', {
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    speed: DataTypes.FLOAT,
    date_time: DataTypes.DATETIME,
    session_id: DataTypes.INTEGER
  }, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    tableName: 'gps_data',
    classMethods: {
      associate: function(models) {
        GpsData.belongsTo(models.Session, {foreignKey: 'session_id', as: 'session'});
      }
    }
  });

  return Track;
};