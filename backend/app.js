const express = require("express");
const mongoose = require("mongoose");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const middlewares = require('./middlewares');

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const usersRoute = require('./routes/users');
const hostsRoute = require('./routes/hosts');
const adminRoute = require('./routes/admin');

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static('static'));
app.set('socketio', io);// Export socketio to be used in global scope.

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/hosts', hostsRoute);
app.use('/api/admin', adminRoute);
app.use('/api/users', usersRoute);

// TODO: MONGODB_URI exists for heroku. String exists for running app locally. String should be removed at production.
const dbURI = process.env.MONGODB_URI || "mongodb+srv://dbadmin:dbadmin124@awsfrankfurtcluster0.olqv2.mongodb.net/PetriamDB?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on("error", (err) => { console.error(err) });
db.once("open", () => { console.log("DB started successfully") });

// For socket testing purposes
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', async socket => {
    console.log('A user connected');
    if(socket.handshake.query.userId) {
        console.log("Connected userId: " + socket.handshake.query.userId);
        socket.join(socket.handshake.query.userId);
    }
    else {
        console.log("Can not join to a room. No userId in socket.handshake.query");
    }
});

http.listen(port, () => { console.log(`Server started: http://localhost:${port}`) });