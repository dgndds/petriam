const mongoose = require('mongoose');
// const fs = require('fs');
// const defaultAvatar64 = fs.readFileSync('./static/default-avatar.png', { encoding: 'base64' }); // File read base path is root of the project, so we dont need "../"
const HostApplication = require('../models/HostApplicationModel');


const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

const model = mongoose.Schema({
    name: {
        type: String,
        default: '',
        required: true
    },
    surname: {
        type: String,
        default: '',
        required: true
    },
    email: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    aboutMe: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
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
        type: pointSchema,
        default: {
            type: 'Point',
            coordinates: [0.0, 0.0]
        },
        index: '2dsphere'
    },
    profileImageURL: {
        type: String,
        default: "/default-avatar.png"
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
    },
    hostId: {
        type: mongoose.ObjectId,
        ref: 'Host',
        default: null
    },
    conversations: {
        type: Array,
        ref: 'Conversation',
        default: []
    },
    hostApplication: {
        type: mongoose.ObjectId,
        ref: 'HostApplication',    
        default: null
    }
});

module.exports = new mongoose.model("User", model);