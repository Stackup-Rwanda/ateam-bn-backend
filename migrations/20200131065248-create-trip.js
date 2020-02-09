const up = (queryInterface, sequelize) => queryInterface.createTable('Trips', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: sequelize.INTEGER
  },
  userId: { type: sequelize.INTEGER },
  tripType: { type: sequelize.STRING },
  from: { type: sequelize.STRING },
  to: { type: sequelize.STRING },
  date: { type: sequelize.DATE },
  returnDate: {
    type: sequelize.DATE,
    allowNull: true,
    defaultValue: null
  },
  reasons: { type: sequelize.STRING },
  accommodationId: { type: sequelize.INTEGER },
  status: { type: sequelize.STRING },
  comment: { type: sequelize.STRING },
  createdAt: { type: sequelize.DATE },
  updatedAt: { type: sequelize.DATE }
});
const down = (queryInterface) => queryInterface.dropTable('Trips');

export {
  up,
  down
};