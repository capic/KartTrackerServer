/**
 * Created by Vincent on 27/08/2015.
 */
module.exports = function(sequelize, DataTypes) {
  var GpsData = sequelize.define('GpsData', {
    gyroscope_x: DataTypes.FLOAT,
    gyroscope_y: DataTypes.FLOAT,
    gyroscope_z: DataTypes.FLOAT,
    accelerometer_x: DataTypes.FLOAT,
    accelerometer_y: DataTypes.FLOAT,
    accelerometer_z: DataTypes.FLOAT,
    rotation_x: DataTypes.FLOAT,
    rotation_y: DataTypes.FLOAT,
    date_time: DataTypes.DATE,
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

  return GpsData;
};