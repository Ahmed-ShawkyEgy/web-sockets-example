//Lets require import the FS module
const http = require('http');
const randopeep = require('randopeep');
const EventEmitter = require('events');
const WebSocketServer = require('websocket').server;

const eventEmitter = new EventEmitter();

const driverData = [];

//Generate 10 objects to work with in the backend for the front end
for (let i = 0; i < 20; i++) genObj();

function genObj() {
  const d = {
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
  driverData.push(d);
}

// Here we generate data for the api that can be used in the front end
setInterval(() => {
  //TODO: Move object location random every 5 seconds
  console.log('emitting obj');
  eventEmitter.emit('update', driverData);
}, 5000);

const server = http.createServer((request, response) => {
  console.log(new Date() + ' Received request for ' + request.url);
  response.writeHead(404);
  response.end();
});
server.listen(8080, () => {
  console.log(new Date() + ' Server is listening on port 8080');
});

const wsServer = new WebSocketServer({
  httpServer: server,
  // autoAcceptConnections should be false in production
  autoAcceptConnections: true,
});

wsServer.on('connect', (connection) => {
  console.log(new Date() + ' Connection accepted');

  const listener = (data) => {
    console.log('Receiving data ', data);
    connection.send(JSON.stringify(data));
  };

  eventEmitter.addListener('update', listener);

  connection.on('close', (reasonCode, description) => {
    console.log(
      new Date() + ' Peer ' + connection.remoteAddress + ' disconnected.'
    );
    console.log(reasonCode + ' ' + description);
    eventEmitter.removeListener('update', listener);
  });
});
