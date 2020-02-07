const commentDefinition = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tripType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    from: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    to: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    returnDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },
    reasons: {
      type: DataTypes.STRING,
    },
    accommodationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
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
  };

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'Users',
      onDelete: 'CASCADE'
    });
  };
  return Comment;
};

export default commentDefinition;
