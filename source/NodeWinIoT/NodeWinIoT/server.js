var http = require('http');
var uwp = require("uwp");
uwp.projectNamespace("Windows.Devices");
var gpioController = Windows.Devices.Gpio.GpioController.getDefault();
var pin = gpioController.openPin(6);
pin.setDriveMode(Windows.Devices.Gpio.GpioPinDriveMode.output)
var currentValue = Windows.Devices.Gpio.GpioPinValue.high;
pin.write(currentValue);
http.createServer(function (req, res) {
    if (currentValue == Windows.Devices.Gpio.GpioPinValue.high) {
        currentValue = Windows.Devices.Gpio.GpioPinValue.low;
    } else {
        currentValue = Windows.Devices.Gpio.GpioPinValue.high;
    }
    pin.write(currentValue);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('LED value: ' + currentValue + '\n');
}).listen(1337);