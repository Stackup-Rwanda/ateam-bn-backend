const userDefinition = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: { type: DataTypes.STRING },
    gender: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    username: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    birthdate: { type: DataTypes.DATE },
    preferredLanguage: { type: DataTypes.STRING },
    preferredCurrency: { type: DataTypes.STRING },
    locationId: { type: DataTypes.INTEGER },
    role: { type: DataTypes.STRING },
    department: { type: DataTypes.STRING },
    lineManager: { type: DataTypes.INTEGER },
    isVerified: { type: DataTypes.BOOLEAN },
    profilePhoto: { type: DataTypes.STRING },
    coverPhoto: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
    social_id: { type: DataTypes.STRING },
    provider: { type: DataTypes.STRING }
  }, {});

  User.associate = (models) => {
    User.hasMany(models.Trip, {
      foreignKey: 'userId',
      as: 'Trips',
      onDelete: 'CASCADE',
    });
    User.hasMany(models.Comment, {
      foreignKey: 'userId',
      as: 'Comments',
      onDelete: 'CASCADE',
    });
  };

  User.associate = (models) => {
    User.hasMany(models.User, {
      foreignKey: 'lineManager', as: 'Users', onDelete: 'CASCADE'
    });
  };
  return User;
};

export default userDefinition;
