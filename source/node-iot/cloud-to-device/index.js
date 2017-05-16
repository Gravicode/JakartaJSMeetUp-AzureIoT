'use strict';

var Client = require('azure-iothub').Client;
var Message = require('azure-iot-common').Message;
var state = true;
var connectionString = 'HostName=FreeDeviceHub.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=pGREIqFsT9rGgDkGJP3K5Vkrg5zmTnNZAxNeqWpT4UM=';
var targetDevice = 'Node-Device';

var serviceClient = Client.fromConnectionString(connectionString);

function printResultFor(op) {
  return function printResult(err, res) {
    if (err) console.log(op + ' error: ' + err.toString());
    if (res) console.log(op + ' status: ' + res.constructor.name);
  };
}

function receiveFeedback(err, receiver){
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
    var degree = 0;
    setInterval( function () {
      degree+=20;
      if(degree>180)degree=0;
      var data = {command : 'servo', params : degree};
      var JsonData = JSON.stringify(data);
      var message = new Message(JsonData);
      message.ack = 'full';
      message.messageId = "My Servo Message";
      console.log('Sending message: ' + message.getData());
      serviceClient.send(targetDevice, message, printResultFor('send'));
      state = !state;
      data = {command : 'led', params : state ? "on" : "off" };
      JsonData = JSON.stringify(data);
      message = new Message(JsonData);
      message.ack = 'full';
      message.messageId = "My LED Message";
      console.log('Sending message: ' + message.getData());
      serviceClient.send(targetDevice, message, printResultFor('send'));
    }, 3000); // The readings will happen every .5 seconds
 
  }
});
