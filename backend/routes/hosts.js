const express = require('express');
const router = express.Router();
const User = require("../models/UserModel");
const Host = require("../models/HostModel");
const Pet = require('../models/PetModel');
const Review = require('../models/ReviewModel');


const middleware = require('../middlewares');

//* Host endpoints ------------------------------------------------------------------------
router.get("/", middleware.verifyJWT, (req, res) => {
    Host.find({}).then(hosts => {
        res.status(200).json(hosts);
    }).catch(err => {
        res.status(500).json({ error: "Failed to find hosts" });
    });
});

router.get("/id", middleware.verifyJWT, (req, res) => {
    Host.findOne({ _id: req.query.hostId }).then(host => {
        res.status(200).json(host);
    }).catch(err => {
        res.status(500).json({ error: "Host not found" });
    });
});

// TODO: Add other filters and return user with host
router.get("/filter", middleware.verifyJWT, (req, res) => {
    //latitude, longitude, radius, price, type,
    console.log(req.query);
    
    req.query.latitude = parseFloat(req.query.latitude);
    req.query.longitude = parseFloat(req.query.longitude);
    req.query.radius = parseFloat(req.query.radius);
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
            $unwind: "$host"
        },
        // {
        //     $match: {
        //         "host.price": {
        //             $lte: req.query.price
        //         },
        //         "host.type": req.query.type
        //     }
        // }
    ]).then(users => {
        res.status(200).json(users);
    }).catch(err => {
        res.status(500).json({ error: "Failed to find users" });
    });
});

// TODO: Change this to insertMany
router.post("/", middleware.verifyJWT, (req, res) => {
    User.findOne({ _id: req.body.userId }).then(user => {
        Host.insert(req.body.host).then(host => {
            user.hostId = host._id;
            res.status(200).json(host);
        }).catch(err => {
            res.status(500).json({ error: "Failed to create host" });
        });
    }).catch(err => {
        res.status(500).json({ error: "User not found" });
    });
});

// TODO: Update user hostid if host id is changed
router.put("/id", middleware.verifyJWT, (req, res) => {
    Host.findOneAndUpdate({ _id: req.body.hostId }, req.body, { new: true }).then(host => {
        res.status(200).json(user);
    }).catch(err => {
        res.status(500).json({ error: "Host not found" });
    });
});

router.delete("/", middleware.verifyJWT, (req, res) => {
    Host.findOneAndDelete({ _id: req.body.hostId }).then(host => {
        res.status(200).json({ success: "Host deleted" });
    }).catch(err => {
        res.status(500).json({ error: "User not found" });
    });
});

//* Host review endpoints -------------------------------------------------------------------------
router.get("/review", middleware.verifyJWT, (req, res) => {
    Review.find({ hostId: req.hostId }).then(reviews => {
        res.status(200).json(reviews);
    }).catch(err => {
        res.status(500).json({ error: 'Review could not be found' });
    });
});

router.post("/review", middleware.verifyJWT, (req, res) => {
    Host.findOne({ _id: req.hostId })
        .then( host => {
            Review.insertMany(req.body.reviews).then(reviews => {
                reviews.forEach(review => { host.reviews.push(review._id); });
                host.save().then(host => {
                    res.status(200).json(reviews);
                }).catch(err => {
                    res.status(500).json({error: "Failed to add reviews to host"});
                });
            }).catch(err => {
                res.status(500).json({error: "Failed to create reviews"});
            });
        }).catch(error => {
            res.status(404).json({ error: 'Host is not valid' });
        });
});

module.exports = router;