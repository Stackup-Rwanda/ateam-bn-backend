# ateam-bn-backend


### Syncing the database using sequelize migrations
#### Make sure the following packages are installed

Postgres:
>npm install --save pg

Sequelize and pg-hstore:
>npm install --save sequelize pg-hstore

Sequelize CLI:
>npm install --save-dev sequelize-cli

dotenv for using database credentials from .env file:
>npm install --save dotenv

#### Running the migration and inserting seed data

To run migrations run the following command:
>npx sequelize-cli db:migrate

To insert the seeds run the following command:
>npx sequelize-cli db:seed:all