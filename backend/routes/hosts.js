const express = require('express');
const router = express.Router();
const User = require("../models/UserModel");
const Host = require("../models/HostModel");
const Pet = require('../models/PetModel');
const Review = require('../models/ReviewModel');

const middlewares = require('../middlewares');

//* ------------------------------------------------------------------------------------------
//* General host endpoints ---------------------------------------------------------------------------
//* ------------------------------------------------------------------------------------------

router.get("/", middlewares.verifyJWT, (req, res) => {
    Host.find({}).then(hosts => {
        res.status(200).json(hosts);
    }).catch(err => {
        res.status(500).json({ error: "Failed to find hosts" });
    });
});

// TODO: Change this to insertMany
router.post("/", middlewares.verifyJWT, (req, res) => {
    User.findOne({ _id: req.body.userId }).then(user => {
        const host = new Host(req.body.host);
        host.save().then(host => {
            user.hostId = host._id;
            user.save().then(user => {
                res.status(200).json(host);
            }).catch(err => {
                res.status(500).json({ error: "Failed to add host to user" });
            });
        }).catch(err => {
            res.status(500).json({ error: "Failed to save host" });
        });
    }).catch(err => {
        res.status(500).json({ error: "User not found" });
    });
});

// TODO: Add other filters and return user with host
router.get("/filter", middlewares.verifyJWT, (req, res) => {
    //latitude, longitude, radius, price, type,
    
    req.query.latitude = parseFloat(req.query.latitude);
    req.query.longitude = parseFloat(req.query.longitude);
    req.query.radius = parseFloat(req.query.radius);
    req.query.price = parseFloat(req.query.price);
    User.aggregate([
        {
            $geoNear: {
                near: {
                    type: "Point",
                    coordinates: [req.query.longitude, req.query.latitude] // Be careful, longitude first!
                },
                distanceField: "distance",
                maxDistance: req.query.radius * 1000, // Convert km to meters
                spherical: true
            }
        },
        {
            $lookup: {
                from: "hosts",
                localField: "_id",
                foreignField: "userId",
                as: "host"
            }
        },
        {
            $match: {
                "host.price": {
                    $lte: req.query.price
                },
                "host.acceptedPets": req.query.petType
            }
        },
        {
            $unwind: "$host"
        }
        
    ]).then(users => {
        res.status(200).json(users);
    }).catch(err => {
        res.status(500).json({ error: "Failed to find users" });
    });
});

router.get("/:hostId", middlewares.verifyJWT, (req, res) => {
    Host.findOne({ _id: req.params.hostId }).then(host => {
        res.status(200).json(host);
    }).catch(err => {
        res.status(500).json({ error: "Host not found" });
    });
});

// TODO: Update user hostid if host id is changed
router.put("/:hostId", middlewares.verifyJWT, (req, res) => {
    Host.findOneAndUpdate({ _id: req.params.hostId }, req.body.host, { new: true }).then(host => {
        res.status(200).json(user);
    }).catch(err => {
        res.status(500).json({ error: "Host not found" });
    });
});

router.delete("/:hostId", middlewares.verifyJWT, (req, res) => {
    Host.findOneAndDelete({ _id: req.params.hostId }).then(user => {
        res.status(200).json(user);
    }).catch(err => {
        res.status(500).json({ error: "User not found" });
    });
});


//* Host review endpoints -------------------------------------------------------------------------

router.get("/review/:hostId", middlewares.verifyJWT, (req, res) => {
    Review.find({ hostId: req.params.hostId }).then(reviews => {
        res.status(200).json(reviews);
    }).catch(err => {
        res.status(500).json({ error: 'Review could not be found' });
    });
});

router.post("/review/:hostId", middlewares.verifyJWT, (req, res) => {
    if(req.body.review.rating < 1 || req.body.review.rating > 5) {
        res.status(400).json({ error: 'Rating must be between 1 and 5' });
        return;
    }
    const review = new Review(req.body.review);
    review.save().then(review => {
        Host.findOneAndUpdate({ _id: req.params.hostId }, { $push: { reviews: review._id } }, { new: true }).then(host => {
            res.status(200).json(review);
        }).catch(err => {
            res.status(500).json({ error: 'Host could not be found' });
        });
    }).catch(err => {
        res.status(500).json({ error: 'Review could not be saved' });
    });
});

module.exports = router;