const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const middlewares = require('../middlewares');


//* ------------------------------------------------------------------------------------------
//* General user endpoints ---------------------------------------------------------------------------
//* ------------------------------------------------------------------------------------------

router.get("/:userId", middlewares.verifyJWT, (req, res) => {
    User.findOne({ _id: req.params.userId }).populate("pets").then(user => {
        res.status(200).json(user);
    }).catch(err => {
        res.status(500).json({ error: "User not found" });
    });
});

router.put("/:userId", middlewares.verifyJWT, (req, res) => {
    User.findOneAndUpdate({ _id: req.params.userId }, req.body.user, { new: true }).then(user => {
        res.status(200).json(user);
    }).catch(err => {
        res.status(500).json({ error: "User not found" });
    });
});

router.delete("/:userId", middlewares.verifyJWT, (req, res) => {
    User.findOneAndDelete({ _id: req.params.userId }).then(user => {
        res.status(200).json({success: "User deleted"});
    }).catch(err => {
        res.status(500).json({ error: "User not found" });
    });
});

module.exports = router;