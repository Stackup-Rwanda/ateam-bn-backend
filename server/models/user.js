const userDefinition = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING
    },
    gender: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    birthdate: {
      type: DataTypes.DATE
    },
    preferredLanguage: {
      type: DataTypes.STRING
    },
    preferredCurrency: {
      type: DataTypes.STRING
    },
    location: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.STRING
    },
    department: {
      type: DataTypes.STRING
    },
    lineManager: {
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    },
    google_id: {
      type: DataTypes.STRING,
    },
    fb_id: {
      type: DataTypes.STRING,
    }
  }, {});
  // eslint-disable-next-line no-unused-vars
  User.associate = (models) => {
    // associations can be defined here
  };
  return User;
};

export default userDefinition;
