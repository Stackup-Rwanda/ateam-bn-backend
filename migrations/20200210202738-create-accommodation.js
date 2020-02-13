const up = (queryInterface, sequelize) => queryInterface.createTable('Accommodation', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: sequelize.INTEGER
  },
  name: {
    type: sequelize.STRING,
    allowNull: false,
  },
  placeId: {
    type: sequelize.INTEGER,
    allowNull: false,
  },
  type: {
    type: sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    type: sequelize.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: sequelize.DATE,
    allowNull: false,
  }
});
const down = (queryInterface) => queryInterface.dropTable('Accommodation');

export {
  up,
  down
};
