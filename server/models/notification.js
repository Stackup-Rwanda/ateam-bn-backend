
const notificationnDefinition = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    tripId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
    description: DataTypes.STRING(500),
    viewed: DataTypes.STRING,
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE }
  }, {});

  Notification.associate = (models) => {
    Notification.belongsTo(models.User, {
      foreignKey: 'receiverId',
      as: 'Users',
      onDelete: 'CASCADE'
    });
  };
  return Notification;
};
export default notificationnDefinition;
