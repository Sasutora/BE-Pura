const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
const Kantor = require('./kantor.js');
const User = require('./user.js');

const Pelayanan = sequelize.define('Pelayanan', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    kode:{
        type: DataTypes.STRING(20),
        unique:true
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    nama_lengkap: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    kecamatan: {
        type: DataTypes.STRING(30),
        allowNull: false,

    },
    kelurahan: {
        type: DataTypes.STRING(30),
        allowNull: false,

    },
    kota: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    provinsi: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    jenis_kelamin: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    pekerjaan: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    golongan_darah: {
        type: DataTypes.STRING(2),
        allowNull: false,
    },
    tempat_lahir: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    tanggal_lahir: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    foto: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    id_kantor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Kantor,
            key: 'id'
        }
    },
    jadwal: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    qr_code: {
        type: DataTypes.STRING,
        allowNull: true
    }
    
    
}, {
    tableName: 'pelayanans', 
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['id_kantor', 'jadwal']
        }
    ]
});

Kantor.hasMany(Pelayanan, { foreignKey: 'id_kantor' });
Pelayanan.belongsTo(Kantor, { foreignKey: 'id_kantor' });
User.hasMany(Pelayanan, { foreignKey: 'id_user' });
Pelayanan.belongsTo(User, { foreignKey: 'id_user' });

module.exports = Pelayanan;
