//Lets require import the FS module
var fs = require('fs');

// Express is our web framework for building a rest API
var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors()); // enable CORS to allow requests from frontend

var nodeStatic = require('node-static');

// register handler to return driver data
app.get('/', function (req, res) {
  fs.readFile('./index.get.json', 'utf8', (err, data) => {
    res.send(data);
  });
});

var randopeep = require('randopeep');
/*
 * randopeep is for generating stuff that we can include in our fake data.
 * */

var file = new nodeStatic.Server('../app');

fs.writeFileSync('./index.get.json', '[]');

//Generate 10 objects to work with in the backend for the front end
for (let i = 0; i < 20; i++) genObj();

function genObj() {
  var o = JSON.parse(fs.readFileSync('./index.get.json', 'utf8'));
  var d = {
    driverName: randopeep.name(),
    driverCityOrigin: randopeep.address.city(),
    driverLanguage: ['de', 'en', 'nl', 'fr', 'es', 'ar'][
      Math.floor(Math.random() * 7)
    ],
    driverPhone: randopeep.address.phone(),
    driverGender: ['male', 'female'][Math.floor(Math.random() * 2)],
    driverInfo: randopeep.corporate.catchPhrase(0),
    carMake: randopeep.corporate.name('large', 0),
    kmDriven: Math.floor(Math.random() * 100000),
    location: randopeep.address.geo(),
  };
  o.push(d);
  fs.writeFileSync('./index.get.json', JSON.stringify(o));
}

// Here we generate data for the api that can be used in the front end
setTimeout(() => {
  //var o = JSON.parse(fs.readFileSync('./cars/index.get.json', 'utf8'));
  //TODO: Move object location random every 5 seconds
  //fs.writeFile("./cars/index.get.json",
  //    JSON.stringify(o));
}, 5000);

function cf() {
  fs.writeFile('./index.get.json', '[]');
}

var http = require('http');
// Create the server for serving static files (html, css etc.)
http
  .createServer((request, response) => {
    request
      .addListener('end', () => {
        //
        // Serve files!
        //
        file.serve(request, response);
      })
      .resume();
  })
  .listen(8080);

// Start the REST API server
app.listen(3000, () => {
  console.log(`API Server is running`);
});
