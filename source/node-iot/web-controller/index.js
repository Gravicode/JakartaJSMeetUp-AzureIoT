'use strict';

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//azure iot
var Client = require('azure-iothub').Client;
var Message = require('azure-iot-common').Message;
var state = true;
var connectionString = 'HostName=FreeDeviceHub.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=pGREIqFsT9rGgDkGJP3K5Vkrg5zmTnNZAxNeqWpT4UM=';
var targetDevice = 'Node-Device';
var isConnected = false;
var serviceClient = Client.fromConnectionString(connectionString);


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
  socket.on('control-device', function (msg) {
    if(!isConnected)return;
    console.log('message: ' + msg);
    io.emit('control-device', msg);
    var data = "";

    switch (msg) {
      case "led-on":
        data = {
          command: 'led',
          params: "on"
        };
        break;
      case "led-off":
        data = {
          command: 'led',
          params: "off"
        };
        break;
      default:
        var pesan = msg.split(":");
        if (pesan[0] != "servo") return;
        data = {
          command: 'servo',
          params: pesan[1]
        };
    }
    var JsonData = JSON.stringify(data);
    var message = new Message(JsonData);
    message.ack = 'full';
    message.messageId = "My Command";
    console.log('Sending message: ' + message.getData());
    serviceClient.send(targetDevice, message, printResultFor('send'));

  });
});

//Azure IoT methods

function printResultFor(op) {
  return function printResult(err, res) {
    if (err) console.log(op + ' error: ' + err.toString());
    if (res) console.log(op + ' status: ' + res.constructor.name);
  };
}

function receiveFeedback(err, receiver) {
  receiver.on('message', function (msg) {
    console.log('Feedback message:')
    console.log(msg.getData().toString('utf-8'));
  });
}

serviceClient.open(function (err) {
  if (err) {
    console.error('Could not connect: ' + err.message);
  } else {
    console.log('Service client connected');
    serviceClient.getFeedbackReceiver(receiveFeedback);
    isConnected = true;
  }
});


http.listen(3000, function () {
  console.log('listening on *:3000');
});