const up = (queryInterface, Sequelize) => queryInterface.createTable('Notifications', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  title: {
    type: Sequelize.STRING
  },
  requester: {
    type: Sequelize.STRING
  },
  manager: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.STRING
  },
  comment: {
    type: Sequelize.STRING
  },
  description: {
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

export {
  up,
  down
};
