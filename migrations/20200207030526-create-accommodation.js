const up = (queryInterface, Sequelize) => queryInterface.createTable('Accommodations', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING },
  image: { type: Sequelize.STRING },
  locationId: { type: Sequelize.INTEGER },
  geoLocation: { type: Sequelize.STRING },
  space: { type: Sequelize.STRING },
  cost: { type: Sequelize.STRING },
  highlights: { type: Sequelize.STRING },
  amenities: { type: Sequelize.STRING },
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
