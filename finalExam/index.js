// index.js

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://jchoi336:<password>@cluster0.huemd.mongodb.net/mydb?retryWrites=true&w=majority";
//const fetch = require('node-fetch');
const fetch = require('cross-fetch');
const bodyParser = require("body-parser");
const https = require('https'); 
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const cors = require("cors");
const app = express();

var corsOptions = {
    origin: "http://localhost:3001"
};
app.use(cors(corsOptions));


app.set("view engine", "ejs");
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// connecting database
mongoose.connect(url)
    .then(() => console.log('Now connected to MongoDB users'))
    .catch(err => console.error('Error: can not connect to user DB', err));

const db = require("./app/models");
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the definitions database");
    })
    .catch(err => {
        console.log("Cannot connect to the definitions database", err);
        process.exit();
    });

// middleware
// parse requests of content-type - application/json
app.use(express.json());

// Routing
app.use('/api/users', users);
app.use('/api/auth', auth);
// Welcome Page
app.get("/", function (req, res) {
    res.render('welcome');
});

// Registration Page
app.get("/register", function (req, res) {
    res.render('register', {
    email: '',
    password: '',    
    isAlert: false,
    alertText: ''
    })
});

// Login Page
app.get("/login", function (req, res) {
    res.render('login', {
    email: '',
    password: '',    
    isAlert: false,
    alertText: ''
    })
});

// Search Page
app.get("/search", function (req, res) {
    res.render('search');
});

require("./app/routes/definition.routes")(app);

// port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));