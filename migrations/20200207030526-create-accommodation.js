const up = (queryInterface, Sequelize) => queryInterface.createTable('Accommodations', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  createdBy: { type: Sequelize.INTEGER },
  name: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING },
  image: { type: Sequelize.TEXT },
  locationId: { type: Sequelize.INTEGER },
  geoLocation: { type: Sequelize.STRING },
  highlights: { type: Sequelize.STRING },
  amenities: { type: Sequelize.ARRAY(Sequelize.STRING) },
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
