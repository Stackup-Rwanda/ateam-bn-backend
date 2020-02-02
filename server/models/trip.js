const tripDefinition = (sequelize, DataTypes) => {
  const Trip = sequelize.define('Trip', {
    from: {
      type: DataTypes.STRING
    },
    to: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATE,
    },
    returnDate: {
      type: DataTypes.DATE,
    },
    reasons: {
      type: DataTypes.STRING,
    },
    accommodation: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
  }, {});

  Trip.associate = (models) => {
    Trip.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'users'
    });
  };
  return Trip;
};

export default tripDefinition;
