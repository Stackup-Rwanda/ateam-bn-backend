const chatDefinition = (sequelize, DataTypes) => {
  const Chat = sequelize.define('Chat', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {});
  Chat.associate = (models) => {
    Chat.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'Users',
      onDelete: 'CASCADE'
    });
  };

  return Chat;
};

export default chatDefinition;
