import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const db = new Sequelize(
  process.env.DEVELOP_DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
  }
);

export default db;
