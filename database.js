const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('pura', 'postgres', 'rama', {
    host: 'pura',
    dialect: 'postgres',
    logging: false, 
});

module.exports = sequelize;
