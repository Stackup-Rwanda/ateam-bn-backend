const accommodationDefinition = (sequelize, DataTypes) => {
  const Accommodation = sequelize.define('Accommodation', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    placeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
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
  Accommodation.associate = (models) => {
    Accommodation.belongsTo(models.Place, {
      foreignKey: 'placeId',
      as: 'Place',
      onDelete: 'CASCADE'
    });
  };
  return Accommodation;
};

export default accommodationDefinition;
