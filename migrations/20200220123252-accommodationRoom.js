
const up = (queryInterface, Sequelize) => queryInterface.createTable('Rooms', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  accommodationId: {
    type: Sequelize.INTEGER,

  },
  roomType: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  amenities: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  },
  cost: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
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
const down = (queryInterface) => queryInterface.dropTable('Rooms');
export
{
  up,
  down
};
