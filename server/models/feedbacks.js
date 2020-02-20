const feedbackDefinition = (sequelize, DataTypes) => {
  const feedbacks = sequelize.define('feedbacks', {
    userId: {
      type: DataTypes.INTEGER
    },
    accommodationId: {
      type: DataTypes.INTEGER
    },
    feedback: {
      type: DataTypes.STRING
    }
  }, {});


  feedbacks.associate = (models) => {
    feedbacks.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'Users',
      onDelete: 'CASCADE'
    });
    feedbacks.belongsTo(models.Accommodations, {
      foreignKey: 'accommodationId',
      as: 'Accommodations',
      onDelete: 'CASCADE'
    });
  };

  return feedbacks;
};

export default feedbackDefinition;
