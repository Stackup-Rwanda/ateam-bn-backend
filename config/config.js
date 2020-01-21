const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    development: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: "barefoot_nomad_db_develop",
      host: "127.0.0.1",
      dialect: "postgres",
      operatorsAliases: false
    },
    test: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: "barefoot_nomad_db_test",
      host: "127.0.0.1",
      dialect: "postgres",
      operatorsAliases: false
    },
    production: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: "barefoot_nomad_db",
      host: "127.0.0.1",
      dialect: "postgres",
      operatorsAliases: false
    }
  }