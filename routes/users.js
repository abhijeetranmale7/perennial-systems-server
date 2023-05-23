const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { dirname } = require('path');
const path = require('path');
const usersRouter = express.Router();
const User = require('../models/users')

// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
    fileFilter: (req, file, cb) => {
        const allowedFileTypes = /png|jpg|jpeg/i;
        const extname = allowedFileTypes.test(file.originalname.toLowerCase());
        const mimetype = allowedFileTypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        }
        cb('Error: Only PNG and JPG files are allowed');
    },
});
const upload = multer({ storage });

// Get all users
usersRouter.get('/', async (req, res) => {
    try {
        const users = await User.find();
        users.forEach((user) => {
            if (user.profileImage) {
                user.profileImage = `${req.protocol}://${req.get('host')}/${user.profileImage.replace(/\\/g, '/')}`;
            }
        });
        res.json(users);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Create user
usersRouter.post('/', upload.single('profileImage'), async (req, res) => {
    try {
        const { firstName, lastName, city, email, phoneNumber } = req.body;
        const newUser = new User({
            firstName,
            lastName,
            city,
            email,
            phoneNumber,
            profileImage: req.file ? req.file.path : '',
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error });
    }
});

// Get user by id
usersRouter.get('/:id', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (user) {
            if (user.profileImage) {
                user.profileImage = `${req.protocol}://${req.get('host')}/${user.profileImage.replace(/\\/g, '/')}`;
            }
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Delete user
usersRouter.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete({ _id: req.params.id });
        if (deletedUser) {
            if (deletedUser.profileImage) {
                const appDir = dirname(require.main.filename);
                const imagePath = path.join(appDir, deletedUser.profileImage);
                fs.unlinkSync(imagePath);
            }
            res.json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = usersRouter;
