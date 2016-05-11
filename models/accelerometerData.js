/**
 * Created by Vincent on 27/08/2015.
 */
module.exports = function(sequelize, DataTypes) {
  var AccelerometerData = sequelize.define('AccelerometerData', {
    gyroscope_x: DataTypes.FLOAT,
    gyroscope_y: DataTypes.FLOAT,
    gyroscope_z: DataTypes.FLOAT,
    accelerometer_x: DataTypes.FLOAT,
    accelerometer_y: DataTypes.FLOAT,
    accelerometer_z: DataTypes.FLOAT,
    rotation_x: DataTypes.FLOAT,
    rotation_y: DataTypes.FLOAT,
    date_time: DataTypes.DATE(6),
  }, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    tableName: 'accelerometer_data',
    classMethods: {
      associate: function(models) {
        AccelerometerData.belongsTo(models.Session, {foreignKey: 'session_id', as: 'session'});
      }
    }
  });

  return AccelerometerData;
};