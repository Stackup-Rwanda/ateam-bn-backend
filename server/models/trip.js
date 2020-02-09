const tripDefinition = (sequelize, DataTypes) => {
  const Trip = sequelize.define('Trip', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tripType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    from: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    to: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    returnDate: { type: DataTypes.DATE },
    reasons: { type: DataTypes.STRING },
    accommodationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE }
  }, {});
  Trip.associate = (models) => {
    Trip.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'Users',
      onDelete: 'CASCADE'
    });
  };
  return Trip;
};

export default tripDefinition;