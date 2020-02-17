const notificationnDefinition = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    tripId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
    description: DataTypes.STRING(500),
    viewed: DataTypes.STRING,
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE }
  }, {});
  return Notification;
};

export default notificationnDefinition;
