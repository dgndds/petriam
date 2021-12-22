const mongoose = require('mongoose');
const fs = require('fs');
const defaultAvatar64 = fs.readFileSync('./static/default-avatar.png', {encoding: 'base64'}); // File read base path is root of the project, so we dont need "../"

const model = mongoose.Schema({
    name: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    pets: {
        type: Array,
        ref: 'Pet',
        default: []
    },
    phone: {
        type: String,
        default: ''
    },
    location: {
        type: Array,
        default: [-1.0, -1.0],
    },
    profileImage: {
        type: Buffer,
        contentType: String,
        default: defaultAvatar64
    },
    blockedUsers: {
        type: Array,
        ref: 'User',
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    activated: {
        type: Boolean,
        default: true // TODO: True for development, false for production
    },
    contracts: {
        type: Array,
        ref: 'Contract',
        default: []
    }
});

module.exports = new mongoose.model("User", model);