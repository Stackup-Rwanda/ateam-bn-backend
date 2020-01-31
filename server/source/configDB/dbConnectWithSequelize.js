import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
const databaseConnection = new Sequelize(process.env.databaseURL);
export default databaseConnection;
