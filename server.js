const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./API/auth');
const pelayananRoutes = require('./API/pelayanan');
const path = require('path');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/qrcode', express.static(path.join(__dirname, 'qrcode')));
app.use('/auth', authRoutes);
app.use('/pelayanan', pelayananRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
