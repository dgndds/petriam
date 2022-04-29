const jwt = require('jsonwebtoken');
exports.JWT_SECRET = "my-32-character-ultra-secure-and";

// Middleware to check if the user is logged in. Next is the next middleware function in the chain.
exports.verifyJWT = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) res.status(401).json({error: "Please provide a token"});
    else {
        jwt.verify(token, exports.JWT_SECRET, (err, value) => {
            if (err){
                res.status(500).json({error: 'Failed to authenticate token'});
                return; // Stop the middleware chain if the token authentication fails.
            }
            if(!value.data.activated){
                res.status(403).json({error: 'Account not activated'});
                return; // Stop the middleware chain if account is not activated.
            }
            req.user = value.data;
            next();
        })
    }
}

exports.socketVerifyJWT = (socket, data) => {
    console.log(socket.handshake.auth);
    const token = socket.handshake.auth["Authorization"].split(' ')[1];
    console.log("token: " +  token);
    if (!token) data = {error: "Please provide a token"};
    else {
        jwt.verify(token, exports.JWT_SECRET, (err, value) => {
            if (err) data = {error: 'Failed to authenticate token'};
            else {
                if(!value.data.activated){
                    data = {error: 'Account not activated'};
                }
                data = value.data;
            }
        })
    }
    console.log("will return null");
}