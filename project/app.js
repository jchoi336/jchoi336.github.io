const express = require('express');
const http = require('http');
const https = require('https');
const bcrypt = require('bcrypt');
const path = require("path");
const bodyParser = require('body-parser');
const users = require('./data').userDB;
const request = require('request');

const app = express();
const server = http.createServer(app);

// Configuring body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./public')));


app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'./public/index.html'));
});


app.post('/register', async (req, res) => {
    try{
        let foundUser = users.find((data) => req.body.email === data.email);
        if (!foundUser) {
    
            let hashPassword = await bcrypt.hash(req.body.password, 10);
    
            let newUser = {
                id: Date.now(),
                username: req.body.username,
                password: hashPassword,
            };
            users.push(newUser);
            console.log('User list', users);
    
            res.send("<div align ='center'><h2>Registration successful</h2></div><br><br><div align='center'><a href='./login.html'>login</a></div><br><br><div align='center'><a href='./register.html'>Register another user</a></div>");
        } else {
            res.send("<div align ='center'><h2>Username already used</h2></div><br><br><div align='center'><a href='./register.html'>Register again</a></div>");
        }
    } catch{
        res.send("Internal server error");
    }
});

app.post('/login', async (req, res) => {
    try{
        let foundUser = users.find((data) => req.body.username === data.username);
        if (foundUser) {
    
            let submittedPass = req.body.password; 
            let storedPass = foundUser.password; 
    
            const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
            if (passwordMatch) {
                let usrname = foundUser.username;
                res.send(`<div align ='center'><h2>Login successful</h2></div><br><br><br><div align ='center'><h3>Hello ${usrname}</h3></div><br><br><div align='center'> <a href='./lookup.html'>Lookup an IP address</a><br><br><a href='./login.html'>logout</a></div>`);
            } else {
                res.send("<div align ='center'><h2>Invalid username or password</h2></div><br><br><div align ='center'><a href='./login.html'>login again</a></div>");
            }
        }
        else {
    
            let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`;
            await bcrypt.compare(req.body.password, fakePass);
    
            res.send("<div align ='center'><h2>Invalid username or password</h2></div><br><br><div align='center'><a href='./login.html'>login again<a><div>");
        }
    } catch{
        res.send("Internal server error");
    }
});

/*
var mapHTML = '<head><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"><link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossorigin=""/></head><body><div class="container"><h1>Geolocation - IP Lookup Map</h1><div id="map"></div></body><script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="crossorigin=""></script><script>var map = L.map("map").setView(['
//<style> #map { height: 500px; }body{font-family: Verdana, Helvetica, Arial, sans-serif;font-size: medium;}</style>
    //mapHTML = mapHTML + data.longitude + ',' + data.latitude + '], 13);L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {attribution: Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>",maxZoom: 18,id: "mapbox/streets-v11",tileSize: 512,zoomOffset: -1,accessToken: "pk.eyJ1IjoiajEyY2hvaSIsImEiOiJja3dqenlkYW4xbnFiMnFxYnk0eGtoZDFvIn0.XiXaUdhzS4oefIX9Zhk0Jg"}).addTo(map);</script>';

app.post('/lookup', async (req, res) => {

    let addr = req.body.address;
    let url = "https://api.ipfind.com?ip=" + addr + "&auth=7d571df0-39c6-42d3-8e75-3fc60d5a986c";
    
    https.get(url,(res) => {
        let body = "";
    
        res.on("data", (chunk) => {
            body += chunk;
        });
    
        res.on("end", () => {
            try {
                let json = JSON.parse(body);
                console.log(json);
                var longitude = json.longitude;
                var latitude = json.latitude;
                console.log(longitude);
                console.log(latitude);
                mapHTML = mapHTML + longitude + ',' + latitude + '], 13);L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {attribution: Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>",maxZoom: 18,id: "mapbox/streets-v11",tileSize: 512,zoomOffset: -1,accessToken: "pk.eyJ1IjoiajEyY2hvaSIsImEiOiJja3dqenlkYW4xbnFiMnFxYnk0eGtoZDFvIn0.XiXaUdhzS4oefIX9Zhk0Jg"}).addTo(map);</script>';
                
            } catch (error) {
                console.error(error.message);
            };
        });
    
    }).on("error", (error) => {
        console.error(error.message);
    });
    console.log(mapHTML);
    res.end(mapHTML);  
});*/



server.listen(3000, function(){
    console.log("server is listening on port: 3000");
}); 