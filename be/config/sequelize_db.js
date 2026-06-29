"use strict";

const db_config = require("./config");
const Sequelize = require("sequelize");
const db_sequelize = {};

const sequelize = new Sequelize(
  db_config.database.DB,
  db_config.database.USER,
  db_config.database.PASSWORD,
  { 
    host: db_config.database.HOST,
    dialect: db_config.database.dialect,
    operatorsAliases: 0,
    logging: false,
    // pool: {
    //   max: db_config.database.pool.max,
    //   min: db_config.database.pool.min,
    //   acquire: db_config.database.pool.acquire,
    //   idle: db_config.database.pool.idle,
    // },
  }
);

db_sequelize.Sequelize = Sequelize;
db_sequelize.sequelize = sequelize;

module.exports = db_sequelize;
