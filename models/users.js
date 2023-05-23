const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    city: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            message: 'Invalid email format',
        },
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                const phoneRegex = /^\d{10}$/;
                return phoneRegex.test(value);
            },
            message: 'Invalid phone number format',
        },
    },
    profileImage: {
        type: String,
        required: false,
        validate: {
            validator: function (value) {
                if (value) {
                    const fileExtensionRegex = /\.(png|jpg|jpeg)$/i;
                    return fileExtensionRegex.test(value);
                } else {
                    return true
                }
            },
            message: 'Invalid file extension. Only PNG and JPG files are allowed',
        },
    },
});

const User = mongoose.model('User', usersSchema)

module.exports = User