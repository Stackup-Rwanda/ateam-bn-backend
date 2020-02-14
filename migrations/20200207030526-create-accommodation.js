const up = (queryInterface, Sequelize) => queryInterface.createTable('Accommodations', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: { type: Sequelize.STRING, allowNull: false },
  description: { type: Sequelize.STRING, allowNull: false },
  image: { type: Sequelize.TEXT, allowNull: false },
  locationId: { type: Sequelize.INTEGER, allowNull: false },
  geoLocation: { type: Sequelize.STRING, allowNull: false },
  space: { type: Sequelize.STRING, allowNull: false },
  cost: { type: Sequelize.STRING, allowNull: false },
  highlights: { type: Sequelize.STRING, allowNull: false },
  amenities: { type: Sequelize.STRING, allowNull: false },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
});

const down = (queryInterface) => queryInterface.dropTable('Accommodations');

export {
  up,
  down
};
