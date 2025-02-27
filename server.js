const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./API/auth');
const pelayananRoutes = require('./API/pelayanan');
const path = require('path');
dotenv.config();
const app = express();
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/auth', authRoutes);
app.use('/pelayanan', pelayananRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
