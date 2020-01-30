import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const db = new Sequelize(
  (process.env.NODE_ENV === 'test' ? process.env.TEST_DB_NAME : process.env.DEVELOP_DB_NAME)
  || (process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_DB_NAME : process.env.DEVELOP_DB_NAME),
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
  }
);

export default db;
