const commentDefinition = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tripId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
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
  Comment.associate = (models) => {
    Comment.belongsTo(models.Trip, {
      foreignKey: 'tripId',
      as: 'Trips',
      onDelete: 'CASCADE'
    });
    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'Users',
      onDelete: 'CASCADE'
    });
  };

  return Comment;
};

export default commentDefinition;
