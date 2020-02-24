const reactionDefinition = (sequelize, DataTypes) => {
  const reactions = sequelize.define('reactions', {
    userId: {
      type: DataTypes.INTEGER
    },
    accommodationId: {
      type: DataTypes.INTEGER
    },
    reactionType: {
      type: DataTypes.STRING,
    }
  }, {});

  reactions.associate = (models) => {
    reactions.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'Users',
      onDelete: 'CASCADE'
    });
    reactions.belongsTo(models.Accommodations, {
      foreignKey: 'accommodationId',
      as: 'Accomodations',
      onDelete: 'CASCADE'
    });
  };
  return reactions;
};

export default reactionDefinition;
