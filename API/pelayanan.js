const express = require('express');
const { Sequelize, Op } = require('sequelize');
const Pelayanan = require('../model/pelayanan');
const Kantor = require('../model/kantor');
const { authenticateToken } = require('./helper');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest:'uploads/'});
const sharp = require('sharp');
const path = require('path');
const QRCode = require('qrcode');
const moment = require('moment');
const fs = require('fs');

router.post('/daftar',authenticateToken,upload.single('file'), async (req, res) => {


    try {
        const parsedData = JSON.parse(req.body.data);

        const originalPath = req.file.path;
        const filename = path.parse(req.file.filename).name;
        const resizedPath = `uploads/${filename}.jpg`;
        await sharp(originalPath)
            .resize(354, 472)
            .jpeg({ quality: 90 })
            .toFile(resizedPath);

        const userId = req.user.id;
        const kantorId = parsedData.id_kantor;
        const jadwal = moment(parsedData.jadwal).format('YYYYMMDD');
        const kodeUnik = `${userId}${kantorId}${jadwal}`;
     const pelayanan = await Pelayanan.create({
        id_user: req.user.id,
        kode:kodeUnik,
        nama_lengkap: parsedData.nama_lengkap,
        kecamatan: parsedData.kecamatan,
        kelurahan: parsedData.kelurahan,
        kota: parsedData.kota,
        provinsi: parsedData.provinsi,
        jenis_kelamin: parsedData.jenis_kelamin,
        pekerjaan: parsedData.pekerjaan,
        golongan_darah: parsedData.golongan_darah,
        tempat_lahir: parsedData.tempat_lahir,
        tanggal_lahir: parsedData.tanggal_lahir,
        foto: resizedPath,
        id_kantor: parsedData.id_kantor,
        jadwal: parsedData.jadwal
    });
    const qrDir = path.join(__dirname, '..', 'qrcode'); 
    if (!fs.existsSync(qrDir)) {
        fs.mkdirSync(qrDir, { recursive: true }); 
    }


    const qrPath = path.join(qrDir, `qrcode_${pelayanan.kode}.png`);
    const qrText = `http://localhost:3000/pelayanan/kode/${pelayanan.kode}`; 

    await QRCode.toFile(qrPath, qrText, {
        width: 300, 
        margin: 2
    });

    pelayanan.qr_code = qrPath;
    await pelayanan.save();
        return res.status(201).json({
            status: "success",
            content: "sukses mendaftar",
            pelayanan : pelayanan
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(500).json({
                status: "Date Error",
                content: error
            });
        }

        
        return res.status(500).json({
            status: "database_error",
            content: error
        });
    }
});


router.get('/user', authenticateToken, async (req, res) => {
    try {
        const  id  = req.user.id;
        const pelayanan = await Pelayanan.findAll({ 
            where:  {
            id_user:id
        },
        include: [{ model: Kantor }]
    });

        if (!pelayanan) {
            return res.status(404).json({
                status: "not_found",
                content: "Pelayanan tidak ditemukan",
            });
        }

        return res.status(200).json({
            status: "success",
            content: pelayanan,
        });
    } catch (error) {
        return res.status(500).json({
            status: "database_error",
            content: error.message,
        });
    }
});

router.get('/kode/:kode', authenticateToken, async (req, res) => {
    try {
        const  kode  = req.params.kode;
        const pelayanan = await Pelayanan.findOne({ where:  
            {kode:kode},
            include: [{ model: Kantor }]
          });

        if (!pelayanan) {
            return res.status(404).json({
                status: "not_found",
                content: "Pelayanan tidak ditemukan",
            });
        }

        return res.status(200).json({
            status: "success",
            content: pelayanan,
        });
    } catch (error) {
        return res.status(500).json({
            status: "database_error",
            content: error.message,
        });
    }
});
module.exports = router;