const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const Kantor = sequelize.define('Kantor', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nama: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },

}, {
    tableName: 'kantors', 
    timestamps: false 
});


module.exports = Kantor;
