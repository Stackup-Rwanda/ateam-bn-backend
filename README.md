[![Build Status](https://travis-ci.org/Stackup-Rwanda/ateam-bn-backend.svg?branch=develop)](https://travis-ci.org/Stackup-Rwanda/ateam-bn-backend) [![Coverage Status](https://coveralls.io/repos/github/Stackup-Rwanda/fan7-bn-backend/badge.svg)](https://coveralls.io/github/Stackup-Rwanda/fan7-bn-backend) [![Maintainability](https://api.codeclimate.com/v1/badges/816cc6aa5f0b3b9179cf/maintainability)](https://codeclimate.com/github/Stackup-Rwanda/ateam-bn-backend/maintainability)

# ateam-bn-backend
> What are we building?
Make company global travel and accommodation easy and convenient for the strong workforce of savvy members of staff, by leveraging the modern web.


### Syncing the database using sequelize migrations
#### (i) Make sure the following packages are installed

Postgres:
>npm install --save pg

Sequelize and pg-hstore:
>npm install --save sequelize pg-hstore

Sequelize CLI:
>npm install --save-dev sequelize-cli

dotenv for using database credentials from .env file:
>npm install --save dotenv

#### (ii) Run pending migrations and insert seed data

To run migrations run the following command:
>npx sequelize-cli db:migrate

To insert the seeds run the following command:
>npx sequelize-cli db:seed:all
