const up = (queryInterface, Sequelize) => queryInterface.createTable('Ratings', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    onDelete: 'CASCADE',
    references: {
      model: 'Users',
      key: 'id',
      as: 'userId',
    },
  },
  accommodationId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    onDelete: 'CASCADE',
    references: {
      model: 'Accommodations',
      key: 'id',
      as: 'accommodationId',
    },
  },
  ratings: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: [0, 0, 0, 0, 0]
  },
  createdAt: {
    allowNull: true,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: true,
    type: Sequelize.DATE
  }
});

const down = (queryInterface) => queryInterface.dropTable('Ratings');

export {
  up,
  down
};
