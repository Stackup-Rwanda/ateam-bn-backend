const accommodationDefinition = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    accommodationId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    roomType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amenities: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    cost: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {});
  Room.associate = (models) => {
    Room.belongsTo(models.Accommodations, {
      foreignKey: 'accommodationId',
      as: 'Accommodations',
      onDelete: 'CASCADE'
    });
    return Room;
  };
  return Room;
};

export default accommodationDefinition;
