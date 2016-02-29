
exports.get = function (req, res){
        console.log('Hello world');
        var mraa = require('mraa');
        
        var inputV = 4.3;
        var inputmV = inputV * 1000;
        
        //GROVE Kit A0 Connector --> Aio(0)
        var myAnalogPin = new mraa.Aio(1);

           
        var reading = myAnalogPin.read();
        var jump = (inputmV / 1024);
        var voltage = reading * 4.202312139;
                
        //var resistance = (1023 - a) * 10000 / a; //get the resistance of the sensor;
        console.log("Resistance: " + resistance);

        var celsius_temperature = (voltage - 500) / 10;
        console.log("Analog Pin (A0) Output: " + Math.round(reading * 100) / 100 + "    |    jump: " + Math.round(jump * 100) / 100 + "    |     Voltage: " + Math.round(voltage * 100) / 100 + "    |    Celsius Temperature " + Math.round(celsius_temperature * 100) / 100);
        res.send("temperature now: " + celsius_temperature);
    }
    
