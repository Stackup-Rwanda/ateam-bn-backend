const notificationnDefinition = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    title: DataTypes.STRING,
    requester: DataTypes.STRING,
    manager: DataTypes.STRING,
    email: DataTypes.STRING,
    status: DataTypes.STRING,
    comment: DataTypes.STRING,
    description: DataTypes.STRING,
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE }
  }, {});
  return Notification;
};

export default notificationnDefinition;
