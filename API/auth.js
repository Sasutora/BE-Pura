const express = require('express');
const { Sequelize, Op } = require('sequelize');
const User = require('../model/user');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        where: {
            email: email,
        }
    });
    if(!user) return res.status(401).json({
        status: "invalid_credentials",
        content: {}
    });

    const isMatch = await bcrypt.compare(password,user.password)
    if (isMatch == false) {
        return res.status(401).json({
            status: "invalid_credentials",
            content: {}
        });
    }
    const token = jwt.sign(
        { id: user.id, email: user.email }, 
        process.env.ACCESS_TOKEN_SECRET, 
        { expiresIn: "1h" } 
    );
    return res.status(200).json({
        status: "success",
        content: {
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        },
        token: token
    });
})

router.post('/signup',async (req,res)=>{
    const{nama,email,password} = req.body
    const hash = await bcrypt.hash(password,13)
    let newUser;
    try {
        newUser = await User.create({
            nama: nama,
            email: email,
            password: hash
        });
    
    } catch (error) {
        if(error.email === "SequelizeUniqueConstraintError") return res.status(400).json({
            status: "user_already_registered",
            content: {}
        });

        return res.status(500).json({
            status: "database_error1",
            content: error
        });
    }
    return res.status(201).json({
        status: "success",
        content: "User created"
    });
})

module.exports = router;