import dotenv from 'dotenv';

dotenv.config();

const development = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DEVELOP_DB_NAME,
  host: process.env.HOST,
  dialect: "postgres",
};

const test = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.TEST_DB_NAME,
  host: process.env.HOST,
  dialect: "postgres",
};

const production = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.PRODUCTION_DB_NAME,
  host: process.env.HOST,
  dialect: "postgres",
};

export default {
  development,
  test,
  production
};

export {
  development,
  test,
  production
};
