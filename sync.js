const sequelize = require('./database');
const Kantor = require('./model/kantor');
const Pelayanan = require('./model/pelayanan');
const User = require('./model/user');
sequelize.sync({ force: false }) 
    .then(() => {
        console.log("Tabel telah dibuat.");
    })
    .catch(err => console.error("Gagal membuat tabel:", err))
    .finally(() => sequelize.close());