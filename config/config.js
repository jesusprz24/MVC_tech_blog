// requires the app to use sequelize and dotenv
const Sequelize = require('sequelize');
require('dotenv').config();

// creates the connection to the db
const sequelize = process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL)
    : new Sequelize(process.env.DB_NAME, process.env.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3001
    });

module.exports = sequelize;