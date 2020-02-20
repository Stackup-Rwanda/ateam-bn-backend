const up = (queryInterface, Sequelize) => queryInterface.createTable('Notifications', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  tripId: {
    type: Sequelize.INTEGER
  },
  receiverId: {
    type: Sequelize.INTEGER
  },
  description: {
    type: Sequelize.STRING(500)
  },
  viewed: {
    type: Sequelize.STRING
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
});

const down = (queryInterface) => queryInterface.dropTable('Notifications');

export { up, down };
