
const up = (queryInterface, Sequelize) => queryInterface.createTable('Bookings', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  roomId: {
    type: Sequelize.INTEGER,

  },
  tripId: {
    type: Sequelize.INTEGER,
  },
  bookedBy: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  from: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  to: {
    type: Sequelize.DATE,
    allowNull: false,
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
const down = (queryInterface) => queryInterface.dropTable('Bookings');
export
{
  up,
  down
};
