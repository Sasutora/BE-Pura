const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('pura', 'postgres', 'rama', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false, 
});

module.exports = sequelize;
