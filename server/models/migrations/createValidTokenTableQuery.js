import Sequelize from 'sequelize';
import databaseConnection from '../../config/dbConnectWithSequelize';

module.exports = databaseConnection.define('validtoken', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  token: Sequelize.STRING(1000)
});
