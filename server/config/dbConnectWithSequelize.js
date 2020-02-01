import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
module.exports = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres'
  }
);
