// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This ambient module example console.logs
ambient light and sound levels and whenever a
specified light or sound level trigger is met.
*********************************************/
//tessel sdk
var tessel = require('tessel');
var ambientlib = require('ambient-attx4');
var ambient = ambientlib.use(tessel.port['A']);

//azure sdk
var clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
var Message = require('azure-iot-device').Message;
var connectionString = 'HostName=FreeDeviceHub.azure-devices.net;DeviceId=Node-Device;SharedAccessKey=JHucBieHxD5CsaQVWuu4wdpo+Zd9s7fq98Uc70RHiTQ=';
var data = null;
var client = clientFromConnectionString(connectionString);

//servo
var servoready = false;
var servolib = require('servo-pca9685');

var servo = servolib.use(tessel.port['B']);

var servo1 = 1; // We have a servo plugged in at position 1

servo.on('ready', function () {
  var position = 0; //  Target position of the servo between 0 (min) and 1 (max).

  //  Set the minimum and maximum duty cycle for servo 1.
  //  If the servo doesn't move to its full extent or stalls out
  //  and gets hot, try tuning these values (0.05 and 0.12).
  //  Moving them towards each other = less movement range
  //  Moving them apart = more range, more likely to stall and burn out
  servo.configure(servo1, 0.05, 0.12, function () {
    servoready = true;
  });
});

//get sensor data
ambient.on('ready', function () {
  // Get points of light and sound data.
  setInterval(function () {
    ambient.getLightLevel(function (err, lightdata) {
      if (err) throw err;
      ambient.getSoundLevel(function (err, sounddata) {
        if (err) throw err;
        var d = new Date();
        data = {
          deviceId: 'Node-Device',
          sound: sounddata * 1000,
          light: lightdata * 1000,
          tanggal: d.toString()
        }
        console.log("Light level:", lightdata * 1000, " ", "Sound Level:", sounddata * 1000);
      });
    });
  }, 500); // The readings will happen every .5 seconds
});

ambient.on('error', function (err) {
  console.log(err);
});

//Azure IoT
function printResultFor(op) {
  return function printResult(err, res) {
    if (err) console.log(op + ' error: ' + err.toString());
    if (res) console.log(op + ' status: ' + res.constructor.name);
  };
}
var connectCallback = function (err) {
  if (err) {
    console.log('Could not connect: ' + err);
  } else {
    console.log('Client connected');

    client.on('message', function (msg) {
      console.log('Id: ' + msg.messageId + ' Body: ' + msg.data);
      var node = JSON.parse(msg.data);
      if (node.command == 'servo' && servoready) {
        var position = node.params / 180;
        console.log('Position (in range 0-1):', position);
        //  Set servo #1 to position pos.
        servo.move(servo1, position);
      } else
      if (node.command == 'led') {
        var state = node.params;
        console.log('LED:', state);
        if (state == "on") {
          tessel.led[2].on();
          tessel.led[3].on();
        } else {
          tessel.led[2].off();
          tessel.led[3].off();
        }
      }
      client.complete(msg, printResultFor('completed'));
    });
    // Create a message and send it to the IoT Hub every second
    setInterval(function () {
      if (data != null) {
        var JsonData = JSON.stringify(data);
        var message = new Message(JsonData);
        message.properties.add('lightAlert', (data.light <= 100) ? 'true' : 'false');
        console.log("Sending message: " + message.getData());
        client.sendEvent(message, printResultFor('send'));
      }
    }, 2000);
  }
};
client.open(connectCallback);