
const up = (queryInterface, sequelize) => queryInterface.createTable('Places', {
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
  country: {
    type: sequelize.STRING,
    allowNull: false,
  },
  city: {
    type: sequelize.STRING,
    allowNull: false,
  },
  visitedtimes: {
    type: sequelize.INTEGER,
    defaultValue: 0
  },
  createdAt: {
    allowNull: false,
    type: sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: sequelize.DATE
  }
});
const down = (queryInterface) => queryInterface.dropTable('Places');

export {
  up,
  down
};
