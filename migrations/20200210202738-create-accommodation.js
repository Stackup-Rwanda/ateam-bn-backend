const up = (queryInterface, sequelize) => queryInterface.createTable('Accommodations', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: sequelize.INTEGER
  },
  name: {
    type: sequelize.STRING
  },
  description: {
    type: sequelize.STRING
  },
  image: {
    type: sequelize.TEXT
  },
  locationId: {
    type: sequelize.INTEGER,
    allowNull: false
  },
  geoLocation: {
    type: sequelize.STRING
  },
  space: {
    type: sequelize.STRING
  },
  cost: {
    type: sequelize.STRING
  },
  highlights: {
    type: sequelize.STRING
  },
  amenities: {
    type: sequelize.STRING
  },
  createdAt: {
    type: sequelize.DATE
  },
  updatedAt: {
    type: sequelize.DATE
  }
});
const down = (queryInterface) => queryInterface.dropTable('Accommodations');

export {
  up,
  down
};
