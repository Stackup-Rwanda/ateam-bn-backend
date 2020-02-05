const up = (queryInterface, Sequelize) => queryInterface.createTable('Notification', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  clent: {
    type: Sequelize.STRING
  },
  agent: {
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


const down = (queryInterface) => queryInterface.dropTable('Notification');

export {
  up,
  down
};
