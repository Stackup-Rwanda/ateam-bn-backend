const placeDefinition = (sequelize, DataTypes) => {
  const Place = sequelize.define('Place', {
    name: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {});
  Place.associate = (models) => {
    Place.hasMany(models.Accommodations, {
      foreignKey: 'locationId',
      as: 'Places',
      onDelete: 'CASCADE'
    });
  };
  return Place;
};
export default placeDefinition;
