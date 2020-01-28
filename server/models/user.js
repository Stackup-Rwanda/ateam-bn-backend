const userDefinition = (sequelize) => {
  const User = sequelize.define('User', {
    firstName: {
      type: sequelize.STRING
    },
    lastName: {
      type: sequelize.STRING
    },
    email: {
      type: sequelize.STRING,
      unique: true
    }
  }, {});
  // eslint-disable-next-line no-unused-vars
  User.associate = (models) => {
    // associations can be defined here
  };
  return User;
};

export default userDefinition;
