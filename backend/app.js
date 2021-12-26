const express = require("express");
const mongoose = require("mongoose");

const app = express();
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const hostRoute = require('./routes/hosts');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/hosts', hostRoute);

// TODO: MONGODB_URI exists for heroku. String exists for running app locally. String should be removed at production.
const dbURI = process.env.MONGODB_URI || "mongodb+srv://dbadmin:dbadmin124@awsfrankfurtcluster0.olqv2.mongodb.net/PetriamDB?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on("error", (err) => { console.error(err) });
db.once("open", () => { console.log("DB started successfully") });

app.listen(port, () => { console.log(`Server started: http://localhost:${port}`) });