const accommodationDefinition = (sequelize, DataTypes) => {
  const Accommodation = sequelize.define('Accommodations', {
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.TEXT
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    geoLocation: {
      type: DataTypes.STRING
    },
    space: {
      type: DataTypes.STRING
    },
    cost: {
      type: DataTypes.STRING
    },
    highlights: {
      type: DataTypes.STRING
    },
    amenities: {
      type: DataTypes.STRING
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
      foreignKey: 'locationId',
      as: 'places',
      onDelete: 'CASCADE'
    });
  };
  Accommodation.associate = (models) => {
    Accommodation.hasMany(models.feedbacks, {
      foreignKey: 'accommodationId',
      as: 'Accommodations',
      onDelete: 'CASCADE'
    });
    Accommodation.hasMany(models.reactions, {
      foreignKey: 'accommodationId',
      as: 'reactions',
      onDelete: 'CASCADE',
    });
  };
  return Accommodation;
};

export default accommodationDefinition;
