/**
 * Created by Vincent on 27/08/2015.
 */
module.exports = function(sequelize, DataTypes) {
  var Session = sequelize.define('Session', {
    id_day_session: DataTypes.INTEGER,
    date_session: DataTypes.DATE,
    name: DataTypes.STRING,
    start_time: DataTypes.TIME,
    end_time: DataTypes.TIME,
    track_id: DataTypes.INTEGER
  }, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    tableName: 'session',
    classMethods: {
      associate: function(models) {
        Session.belongsTo(models.Track, {foreignKey: 'track_id', as: 'track'});
        Session.hasMany(models.GpsData, {foreignKey: 'session_id', as: 'gps_data'});
      }
    }
  });

  return Session;
};