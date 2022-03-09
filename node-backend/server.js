//Lets require import the FS module
const http = require('http');
const randopeep = require('randopeep');
const EventEmitter = require('events');
const WebSocketServer = require('websocket').server;

const MIN_X = 0;
const MAX_X = 100;
const MIN_Y = 0;
const MAX_Y = 100;

const eventEmitter = new EventEmitter();

let driverData = [];

// min and max included
const randInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
const clampX = (x) => clamp(x, MIN_X, MAX_X);
const clampY = (y) => clamp(y, MIN_Y, MAX_Y);

const genObj = () => {
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
    location: {
      x: randInterval(MIN_X, MAX_X),
      y: randInterval(MIN_Y, MAX_Y),
    },
  };
  driverData.push(d);
};

//Generate 10 objects to work with in the backend for the front end
for (let i = 0; i < 20; i++) genObj();

// Here we generate data for the api that can be used in the front end
setInterval(() => {
  // Randomly select & move some of the drivers
  driverData = driverData.map(({ location, ...o }) => {
    if (Math.random() < 0.5) return { ...o, location };
    return {
      ...o,
      location: {
        x: clampX(location.x + randInterval(-5, 5)),
        y: clampY(location.y + randInterval(-5, 5)),
      },
    };
  });
  console.log('emitting obj', driverData);
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
