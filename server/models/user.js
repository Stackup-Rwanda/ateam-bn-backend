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
    location: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING },
    department: { type: DataTypes.STRING },
    lineManager: { type: DataTypes.STRING },
    isVerified: { type: DataTypes.BOOLEAN },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
    google_id: { type: DataTypes.STRING, unique: true },
    fb_id: { type: DataTypes.STRING, unique: true }
  }, {});
  return User;
};

export default userDefinition;
