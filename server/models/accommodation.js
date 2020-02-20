const accommodationDefinition = (sequelize, DataTypes) => {
  const Accommodation = sequelize.define(
    'Accommodations',
    {
      createdBy: {
        type: DataTypes.INTEGER
      },
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
      highlights: {
        type: DataTypes.STRING
      },
      amenities: {
        type: DataTypes.ARRAY(DataTypes.STRING)
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    },
    {}
  );
  Accommodation.associate = (models) => {
    Accommodation.belongsTo(models.Place, {
      foreignKey: 'locationId',
      as: 'places',
      onDelete: 'CASCADE'
    });
    Accommodation.hasMany(models.Room, {
      foreignKey: 'accommodationId',
      as: 'Rooms',
      onDelete: 'CASCADE',
    });
  };
  Accommodation.associate = (models) => {
    Accommodation.hasMany(models.feedbacks, {
      foreignKey: 'accommodationId',
      as: 'Accommodations'
    });
  };
  Accommodation.associate = (models) => {
    Accommodation.belongsTo(models.User, {
      foreignKey: 'createdBy',
      as: 'Users',
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
