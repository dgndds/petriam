const express = require('express');
const router = express.Router();
const User = require("../models/UserModel");
const Host = require("../models/HostModel");
const Pet = require('../models/PetModel');
const Contract = require('../models/ContractModel');
const Conversation = require('../models/ConversationModel');
const Message = require('../models/MessageModel');
const Admin = require("../models/AdminModel");
const HostApplication = require('../models/HostApplicationModel');

const middlewares = require('../middlewares');


//* ------------------------------------------------------------------------------------------
//* Admin endpoints ---------------------------------------------------------------------------
//* ------------------------------------------------------------------------------------------

router.get("/host/application", middlewares.verifyJWT, (req, res) => {

    Admin.findOne({ userId: req.user._id }).then(user => {
        if (user == null) {
            res.status(500).json({ error: "User is not an admin" });
            return;
        }
        HostApplication.find({}).then(applications => {
            res.status(200).json(applications);
        }).catch(err => {
            res.status(500).json({ error: "Failed to find host applications" });
        });
    }).catch(err => {
        res.status(500).json({ error: "User is not an admin" });
    });
});

router.post("/host/application/accept", middlewares.verifyJWT, (req, res) => {

    Admin.findOne({ userId: req.user._id }).then(user => {

        if (user == null) {
            res.status(500).json({ error: "User is not an admin" });
            return;
        }

        console.log(req.body);
        HostApplication.findOne({ userId: req.body.userId }).then(application => {

            application.status = '1';
            application.save().then(application => {
                
                var host = new Host();
                host.userId = application.userId;
                host.tc = application.tc;
                host.acceptedPets = application.acceptedPets;
                host.criminalRecord = application.criminalRecord;
                host.address = application.address;

                console.log("Aloo");
                User.findOne({ _id: host.userId })
                    .then(user => {
                        if (user.hostId) {
                            res.status(500).json({ error: 'User already is a host' });
                            return;
                        }
                        Host.create(host).then(host => {
                            user.hostId = host._id;
                            user.save().then(user => {
                                res.status(200).json(host);
                            }).catch(err => {
                                res.status(500).json({ error: "Failed to add host to user" });
                            });
                        }).catch(err => {
                            res.status(500).json({ error: "Failed to create host" });
                        });
                    }).catch(error => {
                        res.status(404).json({ error: 'User is not valid' });
                    });

            }).catch(err => {
                res.status(500).json({error: "Application couldnt be saved"});
            });


        }).catch(err => {
            res.status(500).json({ error: "Application is not found" })
        });
    }).catch(err => {
        res.status(500).json({ error: "User is not an admin" });
    });
});

router.post("/host/application/reject", middlewares.verifyJWT, (req, res) => {

    Admin.findOne({ userId: req.user._id }).then(user => {
        if (user == null) {
            res.status(500).json({ error: "User is not an admin" });
            return;
        }

        HostApplication.findOne({ userId: req.params.userId }).then(application => {
            application.status = '2';
            application.save();
        }).catch(err => {
            res.status(500).json({ error: "Application is not found" })
        });

    }).catch(err => {
        res.status(500).json({ error: "User is not an admin" });
    });

});

router.get("/:hostId", middlewares.verifyJWT, (req, res) => {

    Admin.findOne({ userId: req.user._id }).then(user => {
        if (user == null) {
            res.status(500).json({ error: "User is not an admin" });
            return;
        }

        Host.findOne({ _id: req.params.hostId }).then(host => {
            res.status(200).json(host);
        }).catch(err => {
            res.status(500).json({ error: "Host not found" });
        });

    }).catch(err => {
        res.status(500).json({ error: "User is not an admin" });
    });


});




module.exports = router;