const up = (queryInterface, Sequelize) => queryInterface.createTable('Users', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING
  },
  gender: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  username: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING
  },
  birthdate: {
    type: Sequelize.DATE
  },
  preferredLanguage: {
    type: Sequelize.STRING
  },
  preferredCurrency: {
    type: Sequelize.STRING
  },
  location: {
    type: Sequelize.STRING
  },
  role: {
    type: Sequelize.STRING
  },
  department: {
    type: Sequelize.STRING
  },
  lineManager: {
    type: Sequelize.STRING
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  google_id: {
    type: Sequelize.STRING,
    unique: true
  },
  fb_id: {
    type: Sequelize.STRING,
    unique: true
  }
});

const down = (queryInterface) => queryInterface.dropTable('Users');

export {
  up,
  down
};
