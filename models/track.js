/**
 * Created by Vincent on 27/08/2015.
 */
module.exports = function(sequelize, DataTypes) {
  var Track = sequelize.define('Track', {
    name: DataTypes.STRING
  }, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    tableName: 'track',
    classMethods: {
      associate: function(models) {
        Track.hasMany(models.Session, {foreignKey: 'track_id'});
      }
    }
  });

  return Track;
};