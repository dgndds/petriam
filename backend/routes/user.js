const express = require('express');
const router = express.Router();
const User = require("../models/UserModel");
const Pet = require('../models/PetModel');

const middleware = require('../middlewares');

//* User endpoints ------------------------------------------------------------------------
router.get("/", middleware.verifyJWT, (req, res) => {
    User.findOne({ _id: req.user._id }).then(user => {
        res.status(200).json(user);
    }).catch(err => {
        res.status(500).json({error: "User not found"});
    });
});

router.put("/", middleware.verifyJWT, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, req.body, { new: true }).then(user => {
        res.status(200).json(user);
    }).catch(err => {
        res.status(500).json({error: "User not found"});
    });
});

router.delete("/", middleware.verifyJWT, (req, res) => {
    User.findOneAndDelete({ _id: req.user._id }).then(user => {
        res.status(200).json(user);
    }).catch(err => {
        res.status(500).json({error: "User not found"});
    });
});


//* Pet endpoints -------------------------------------------------------------------------
router.get("/pet", middleware.verifyJWT, (req, res) => {
    Pet.find({ ownerId: req.user._id }).then( pets => {
        res.status(200).json(pets);
    }).catch(err => {
        res.status(500).json({ error: 'Pets could not be found' });
    });
});

router.post("/pet", middleware.verifyJWT, (req, res) => {
    User.findOne({ _id: req.user._id })
        .then( user => {
            // Assign current user as owner of the pets
            req.body.pets.forEach(pet => { pet.ownerId = user._id; });
            Pet.insertMany(req.body.pets).then(pets => {
                // Add pets to user's pets array
                pets.forEach(pet => { user.pets.push(pet._id); });
                user.save().then(user => {
                    res.status(200).json(pets);
                }).catch(err => {
                    res.status(500).json({error: "Failed to add pets to user"});
                });
            }).catch(err => {
                res.status(500).json({error: "Failed to create pets"});
            });
        }).catch(error => {
            res.status(404).json({ error: 'User is not valid' });
        });
});

router.put("/pet", middleware.verifyJWT, (req, res) => {
    // Find pet by id and update it. {new: true} returns the updated pet
    Pet.findOneAndUpdate({ _id: req.body.petId }, req.body.pet, { new: true }).then(pet => {
        res.status(200).json(pet);
    }).catch(err => {
        res.status(500).json({ error: 'Failed to update pet' });
    });
});

router.delete("/pet", middleware.verifyJWT, (req, res) => {
    User.findOne({ _id: req.user._id }).then(user => {
        // Remove pet from user's pets array
        user.pets.splice(user.pets.indexOf(req.body.petId), 1);
        user.save().then(user => {
            // Remove pet from database
            Pet.findOneAndDelete({ _id: req.body.petId }).then(pet => {
                res.status(200).json(pet);
            }).catch(err => {
                res.status(500).json({ error: 'Failed to delete pet' });
            });
        }).catch(err => {
            res.status(500).json({ error: 'Failed to remove pet from user' });
        });
    }).catch(err => {
        res.status(500).json({ error: 'Failed to find user' });
    });
});

module.exports = router;