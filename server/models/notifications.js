const notificationnDefinition = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notifications', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    email: DataTypes.STRING,
    clent: DataTypes.STRING,
    agent: DataTypes.STRING,
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE }
  }, {});
  return Notification;
};

export default notificationnDefinition;
