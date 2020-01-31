import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
module.exports = new Sequelize(process.env.databaseURL, {
  host: 'localhost',
  dialect: 'postgres'
});
