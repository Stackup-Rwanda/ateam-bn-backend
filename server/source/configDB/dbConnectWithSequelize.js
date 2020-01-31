import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres'
  }
);
const databaseConnection = sequelize;
export default databaseConnection;

// import Sequelize from 'sequelize';
// import dotenv from 'dotenv';

// dotenv.config();
// const databaseConnection = new Sequelize(process.env.databaseURL, { dialect: 'postgres' });
// export default databaseConnection;
