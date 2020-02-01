import dotenv from 'dotenv';
dotenv.config();
const generateCredentials = (database, host) => ({
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
<<<<<<< HEAD
  database: process.env.DEVELOP_DB_NAME,
  host: process.env.HOST,
  dialect: "postgres"
};

const test = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.TEST_DB_NAME,
  host: process.env.HOST,
  dialect: "postgres"
};

const production = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.PRODUCTION_DB_NAME,
  host: process.env.HOST,
  dialect: "postgres"
};

=======
  database,
  host,
  dialect: 'postgres'
});
const development = generateCredentials(process.env.DEVELOP_DB_NAME, process.env.HOST);
const test = generateCredentials(process.env.TEST_DB_NAME, process.env.HOST);
const production = generateCredentials(process.env.PRODUCTION_DB_NAME, process.env.HOST);
>>>>>>> 48b55efee86963539de4c58fc0626f5aa619fd61
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
