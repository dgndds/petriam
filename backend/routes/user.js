const express = require('express');
const router = express.Router();
const User = require("../models/UserModel");
const Host = require("../models/HostModel");
const Pet = require('../models/PetModel');
const Contract = require('../models/ContractModel');
const Conversation = require('../models/ConversationModel');
const Message = require('../models/MessageModel');

const middlewares = require('../middlewares');


//* ------------------------------------------------------------------------------------------
//* User endpoints ---------------------------------------------------------------------------
//* ------------------------------------------------------------------------------------------

router.get("/", middlewares.verifyJWT, (req, res) => {
    User.findOne({ _id: req.user._id }).then(user => {
        res.status(200).json(user);
    }).catch(err => {
        res.status(500).json({ error: "User not found" });
    });
});

router.put("/", middlewares.verifyJWT, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, req.body.user, { new: true }).then(user => {
        res.status(200).json(user);
    }).catch(err => {
        res.status(500).json({ error: "User not found" });
    });
});

router.delete("/", middlewares.verifyJWT, (req, res) => {
    User.findOneAndDelete({ _id: req.user._id }).then(user => {
        res.status(200).json({success: "User deleted"});
    }).catch(err => {
        res.status(500).json({ error: "User not found" });
    });
});


//* ------------------------------------------------------------------------------------------
//* User pet endpoints -----------------------------------------------------------------------
//* ------------------------------------------------------------------------------------------

router.get("/pet", middlewares.verifyJWT, (req, res) => {
    Pet.find({ ownerId: req.user._id }).then( pets => {
        res.status(200).json(pets);
    }).catch(err => {
        res.status(500).json({ error: 'Pets could not be found' });
    });
});

router.post("/pet", middlewares.verifyJWT, (req, res) => {
    User.findOne({ _id: req.user._id })
        .then(user => {
            // Assign current user as owner of the pets
            req.body.pets.forEach(pet => { pet.ownerId = user._id; });
            Pet.insertMany(req.body.pets).then(pets => {
                // Add pets to user's pets array
                pets.forEach(pet => { user.pets.push(pet._id); });
                user.save().then(user => {
                    res.status(200).json(pets);
                }).catch(err => {
                    res.status(500).json({ error: "Failed to add pets to user" });
                });
            }).catch(err => {
                res.status(500).json({ error: "Failed to create pets" });
            });
        }).catch(error => {
            res.status(404).json({ error: 'User is not valid' });
        });
});

router.put("/pet", middlewares.verifyJWT, (req, res) => {
    // Find pet by id and update it. {new: true} returns the updated pet
    Pet.findOneAndUpdate({ _id: req.body.petId }, req.body.pet, { new: true }).then(pet => {
        res.status(200).json(pet);
    }).catch(err => {
        res.status(500).json({ error: 'Failed to update pet' });
    });
});

router.delete("/pet", middlewares.verifyJWT, (req, res) => {
    User.findOne({ _id: req.user._id }).then(user => {
        // Remove pet from user's pets array
        user.pets.splice(user.pets.indexOf(req.body.petId), 1);
        user.save().then(user => {
            // Remove pet from database
            Pet.findOneAndDelete({ _id: req.body.petId }).then(pet => {
                res.status(200).json({success: "Pet deleted"});
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


//* ------------------------------------------------------------------------------------------
//* Contract endpoints -----------------------------------------------------------------------
//* ------------------------------------------------------------------------------------------

router.get("/contract", middlewares.verifyJWT, (req, res) => {
    Contract.find({ $or: [{ ownerId: req.user._id }, { hostId: req.user._id },] }).then(contract => {
        res.status(200).json(contract);
    }).catch(err => {
        res.status(500).json({ error: 'Contracts could not be found' });
    });
});

router.post("/contract", middlewares.verifyJWT, (req, res) => {
    if(req.body.contract.hostId === req.user._id) {
        res.status(400).json({ error: 'You cannot create a contract with yourself' });
        return;
    }

    User.findOne({ _id: req.user._id })
        .then(user => {
            const contract = new Contract(req.body.contract);
            contract.ownerId = user._id;
            contract.save().then(contract => {
                user.contracts.push(contract._id);
                user.save().then(user => {
                    res.status(200).json(contract);
                }).catch(err => {
                    res.status(500).json({ error: 'Failed to add contract to user' });
                });
            }).catch(err => {
                res.status(500).json({ error: 'Failed to create contract' });
            });
        });
});

//* --------------------------------------------------------------------------------------------
//* User's host endpoints ----------------------------------------------------------------------
//* --------------------------------------------------------------------------------------------

router.get("/host", middlewares.verifyJWT, (req, res) => {
    Host.findOne({ userId: req.user._id }).then(host => {
        res.status(200).json(host);
    }).catch(err => {
        res.status(500).json({ error: 'Host could not be found' });
    });
});

// TODO: Host should not be added by user. Host should be added by admin.
router.post("/host", middlewares.verifyJWT, (req, res) => {
    req.body.host.userId = req.user._id
    User.findOne({ _id: req.user._id })
        .then( user => {
            if(user.hostId) {
                res.status(500).json({ error: 'User already is a host' });
                return;
            }
            Host.create(req.body.host).then(host => {
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
});

router.put("/host", middlewares.verifyJWT, (req, res) => {
    Host.findOneAndUpdate({ userId: req.user._id }, req.body.host, { new: true }).then(host => {
        res.status(200).json(host);
    }).catch(err => {
        res.status(500).json({ error: 'Host could not be found' });
    });
});

// TODO: Host should not be deleted by user. Host should be deleted by admin.
router.delete("/host", middlewares.verifyJWT, (req, res) => {
    Host.findOneAndDelete({ userId: req.user._id }).then(host => {
        User.findOne({ _id: req.user._id }).then(user => {
            user.hostId = null;
            user.save().then(user => {
                res.status(200).json({success: "Host deleted"});
            }).catch(err => {
                res.status(500).json({ error: "Failed to remove host from user" });
            });
        }).catch(err => {
            res.status(500).json({ error: "Failed to find user" });
        });
    }).catch(err => {
        res.status(500).json({ error: 'Host could not be found' });
    });
});


//* ------------------------------------------------------------------------------------------
//* User conversation endpoints --------------------------------------------------------------
//* ------------------------------------------------------------------------------------------

router.get("/conversation", middlewares.verifyJWT, (req, res) => {
    console.log(req.user._id);
    Conversation.findOne({ $or: [{ ownerId: req.user._id }, { hostUserId: req.user._id },] }).populate('ownerId').populate('hostUserId').populate("messages").then(conversation => {
        res.status(200).json(conversation);
    }).catch(err => {
        res.status(500).json({ error: 'Conversation could not be found' });
    });
});

router.get("/conversation/:conversationId", middlewares.verifyJWT, (req, res) => {
    Conversation.findOne({$or: [{ ownerId: req.user._id }, { hostId: req.user._id }], _id: req.params.conversationId }).populate('ownerId').populate('hostUserId').populate("messages").then(conversation => {
        res.status(200).json(conversation);
    }).catch(err => {
        res.status(500).json({ error: 'Conversation could not be found' });
    });
});

//! I thought this was needed, but now I cannot find a case where it is needed.
router.get("/conversation/:hostUserId", middlewares.verifyJWT, (req, res) => {
    Conversation.findOne({ ownerId: req.user._id, hostUserId: req.params.hostUserId }).then(conversation => {
        res.status(200).json(conversation);
    }).catch(err => {
        res.status(500).json({ error: 'Conversation could not be found' });
    });
});

// TODO: Conversation validity should be checked.
router.post("/conversation", middlewares.verifyJWT, (req, res) => {
    req.body.conversation.ownerId = req.user._id;
    Conversation.findOne({ ownerId: req.user._id, hostUserId: req.body.conversation.hostUserId }).then(conversation => {
        // I do not know why but conversation is returned as null here even if it is not found.(It should go to catch block)
        // Check whether conversation is null and if it is, create a new conversation else return the existing one.
        if(conversation) {
            res.status(200).json(conversation);
        } else {
            Conversation.create(req.body.conversation).then(conversation => {
                res.status(200).json(conversation);
            }).catch(err => {
                res.status(500).json({ error: 'Conversation could not be created' });
            });
        }
    }).catch(err => {
        Conversation.create(req.body.conversation).then(conversation => {
            res.status(200).json(conversation);
        }).catch(err => {
            res.status(500).json({ error: 'Conversation could not be created' });
        });
    });
});


//* ------------------------------------------------------------------------------------------
//* User message endpoints --------------------------------------------------------------------
//* ------------------------------------------------------------------------------------------

router.get("/message/:conversationId", middlewares.verifyJWT, (req, res) => {
    Conversation.findOne({ _id: req.params.conversationId, $or: [{ownerId: req.user._id}, {hostUserId: req.user._id}] }).then(conversation => {
        Message.find({ conversationId: req.params.conversationId }).then(messages => {
            res.status(200).json(messages);
        }).catch(err => {
            res.status(500).json({ error: 'Messages could not be found' });
        });
    }).catch(err => {
        res.status(500).json({ error: 'Conversation could not be found' });
    });
});

// TODO: Sender and receiver should not be same and should be checked in the backend.
router.post("/message", middlewares.verifyJWT, (req, res) => {
    if(req.user._id === req.body.message.receiverId) {
        res.status(500).json({ error: 'Sender and receiver can not be same' });
        return;
    }

    const io = req.app.get('socketio'); // Get the socket.io instance from the global scope.

    Conversation.findOne({ $or: [{ ownerId: req.user._id, hostUserId: req.body.message.receiverId }, { ownerId: req.body.message.receiverId, hostUserId: req.user._id }] }).then(conversation => {
        let _message = req.body.message;
        _message.senderId = req.user._id;
        _message.conversationId = conversation._id;
        Message.create(_message).then(message => {
            conversation.messages.push(message._id);
            conversation.save().then(conversation => {
                io.in(req.body.message.receiverId).emit("new-message", message); //? Send message to other user through socket. Don't know what happens if user is not online(No socket with req.body.message.receiverId).
                io.in(req.user._id).emit("new-message", message); // Also send message to current user through socket.
                res.status(200).json(message);
            }).catch(err => {
                res.status(500).json({ error: 'Message could not be added to conversation' });
            });
        }).catch(err => {
            res.status(500).json({ error: 'Message could not be created' });
        });
    }).catch(err => {
        res.status(500).json({ error: 'Conversation could not be found' });
    });
});



module.exports = router;