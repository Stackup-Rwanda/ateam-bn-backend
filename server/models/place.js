const placeDefinition = (sequelize, DataTypes) => {
  const Place = sequelize.define('Place', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {});
  Place.associate = (models) => {
    Place.hasMany(models.Accommodation, {
      foreignKey: 'placeId',
      as: 'Place',
      onDelete: 'CASCADE'
    });
  };
  return Place;
};

export default placeDefinition;
