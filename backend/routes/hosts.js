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

router.get("/:hostId", middleware.verifyJWT, (req, res) => {
    Host.findOne({ _id: req.params.hostId }).then(host => {
        res.status(200).json(host);
    }).catch(err => {
        res.status(500).json({ error: "Host not found" });
    });
});

// TODO: Add other filters and return user with host
router.get("/filter", middleware.verifyJWT, (req, res) => {
    //latitude, longitude, radius, price, type,
    console.log(req.body);
    User.aggregate([
        {
            $geoNear: {
                near: {
                    type: "Point",
                    coordinates: [req.body.longitude, req.body.latitude] // Be careful, longitude first!
                },
                distanceField: "distance",
                maxDistance: req.body.radius * 1000, // Convert km to meters
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
        //             $lte: req.body.price
        //         },
        //         "host.type": req.body.type
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

// TODO: Update user hostid if host id is changed
router.put("/:hostId", middleware.verifyJWT, (req, res) => {
    Host.findOneAndUpdate({ _id: req.params.hostId }, req.body.host, { new: true }).then(host => {
        res.status(200).json(user);
    }).catch(err => {
        res.status(500).json({ error: "Host not found" });
    });
});

router.delete("/:hostId", middleware.verifyJWT, (req, res) => {
    Host.findOneAndDelete({ _id: req.params.hostId }).then(user => {
        res.status(200).json(user);
    }).catch(err => {
        res.status(500).json({ error: "User not found" });
    });
});


//* Host review endpoints -------------------------------------------------------------------------

router.get("/review/:hostId", middleware.verifyJWT, (req, res) => {
    Review.find({ hostId: req.params.hostId }).then(reviews => {
        res.status(200).json(reviews);
    }).catch(err => {
        res.status(500).json({ error: 'Review could not be found' });
    });
});

router.post("/review/:hostId", middleware.verifyJWT, (req, res) => {
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