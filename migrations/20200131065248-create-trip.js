const up = (queryInterface, sequelize) => queryInterface.createTable('Trips', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: sequelize.INTEGER
  },
  userId: {
    type: sequelize.INTEGER,
    allowNull: true
  },
  name: {
    type: sequelize.STRING,
    allowNull: true
  },
  passportId: {
    type: sequelize.STRING,
    allowNull: true
  },
  tripType: {
    type: sequelize.STRING,
    allowNull: true
  },
  from: {
    type: sequelize.INTEGER,
    allowNull: true
  },
  to: {
    type: sequelize.ARRAY(sequelize.INTEGER),
    allowNull: true
  },
  date: {
    type: sequelize.DATE,
    allowNull: true
  },
  returnDate: {
    type: sequelize.DATE,
    allowNull: true,
    defaultValue: null
  },
  reasons: {
    type: sequelize.STRING,
    allowNull: true
  },
  accommodationId: {
    type: sequelize.INTEGER,
  },
  status: {
    type: sequelize.STRING,
    defaultValue: 'Pending'
  },
  createdAt: {
    type: sequelize.DATE,
  },
  updatedAt: {
    type: sequelize.DATE,
  },
});
const down = (queryInterface) => queryInterface.dropTable('Trips');

export {
  up,
  down
};
