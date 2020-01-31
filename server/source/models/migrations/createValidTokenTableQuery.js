import Sequelize from 'sequelize';
import databaseConnection from '../../configDB/dbConnectWithSequelize';

const validTokenTable = databaseConnection.define('validtoken', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  token: Sequelize.STRING(1000)
});
export default validTokenTable;
