
const up = (queryInterface, Sequelize) => queryInterface.createTable('Comments', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  userId: {
    type: Sequelize.INTEGER
  },
  userName: {
    type: Sequelize.STRING
  },
  userRole: {
    type: Sequelize.STRING
  },
  tripId: {
    type: Sequelize.INTEGER
  },
  comment: {
    type: Sequelize.TEXT
  },
  profile: {
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
const down = (queryInterface) => queryInterface.dropTable('Comments');
export { up, down };
