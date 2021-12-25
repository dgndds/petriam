const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const rounds = 10;

const jwt = require('jsonwebtoken');

const middleware = require('../middlewares');

router.post('/login', (req, res) => {
    User.findOne({email: req.body.email}).then(user => {
        if(!user) res.status(404).json({error: 'Invalid email'});
        else {
            bcrypt.compare(req.body.password, user.passwordHash, (error, match) => {
                if (error) res.status(500).json(error);
                else if (match) res.status(200).json({token: generateToken({_id: user._id, activated: user.activated})});
                else res.status(403).json({error: 'Invalid password'});
            });
        }
    }).catch(error => {
        res.status(500).json(error);
    });
});

router.post('/signup', (req, res) => {
    User.findOne({email: req.body.email}).then(user => {
        res.status(500).json({error: "Email address (" + user.email + ") is already registered."});
    }).catch(_ => {
        bcrypt.hash(req.body.password, rounds, (error, hash) => {
            if (error) res.status(500).json(error)
            else {
                const newUser =  User({name: req.body.username, email: req.body.email, passwordHash: hash})
                newUser.save()
                    .then(user => {
                        res.status(200).json({token: generateToken({_id: user._id, activated: user.activated})});
                    })
                    .catch(error => {
                        res.status(500).json(error)
                    });
            }
        });
    });
});

router.get('/jwt-test', middleware.verifyJWT , (req, res) => {
    res.status(200).json(req.user);
});

function generateToken(user){
    return jwt.sign({data: user}, middleware.JWT_SECRET, {expiresIn: "90d"});
}

module.exports = router;