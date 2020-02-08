const tokenDefinition = (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    value: { type: DataTypes.STRING },
    userId: { type: DataTypes.INTEGER },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE }
  }, {});

  return Token;
};

export default tokenDefinition;
