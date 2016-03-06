
exports.get = function (req, res){
        console.log('Hello world');
        var mraa = require('mraa');
        var five = require("johnny-five");
        var Galileo = require("galileo-io");
        var board = new five.Board({
                io: new Galileo()
        });
 
        board.on("ready", function() {
        var THERMISTORNOMINAL = 10000;
        var TEMPERATURENOMINAL = 25;
        var BCOEFFICIENT = 3950;
        var SERIESRESISTOR = 10000 ;
        this.pinMode(7, five.Pin.OUTPUT);
        this.analogRead(0, function(value) {
                var voltage = (value * 5.0) / 1023;
                var resistance = 1023/value
                resistance = resistance - 1;
                resistance = 9000 / resistance;
          var steinhart = value / THERMISTORNOMINAL;     // (R/Ro)
          steinhart = Math.log(steinhart);                  // ln(R/Ro)
          steinhart /= BCOEFFICIENT;                   // 1/B * ln(R/Ro)
          steinhart += 1.0 / (TEMPERATURENOMINAL + 273.15); // + (1/To)
          steinhart = 1.0 / steinhart;                 // Invert
          steinhart -= 273.15;                         // convert to C
              
                //var tempC = 3950 /(Math.log((1025.0 * 10 / value - 10) / 10) + 3950 / 298.0) - 273.0;
                console.log("Value: " + value + "   |   voltage: " + voltage + "   |   Resistance: " + resistance + "   |   temp: " + steinhart);
        });
        });
        console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the co
        
        var myDigitalPin7 = new mraa.Gpio(7);
        myDigitalPin7.dir(mraa.DIR_IN);
        
        var a = myDigitalPin7.read();
        
        
        var inputV =5.0;
        var inputmV = inputV * 1000;
        
        //GROVE Kit A0 Connector --> Aio(0)
        var myAnalogPin = new mraa.Aio(1);

           
        var reading = myAnalogPin.read();
        var jump = (inputmV / 1024);
        var voltage = reading * 4.202312139;
                
        //var resistance = (1023 - a) * 10000 / a; //get the resistance of the sensor;
        //console.log("Resistance: " + resistance);

        var celsius_temperature = (voltage - 500) / 10;
        console.log("Analog Pin (A0) Output: " + a + "    |    jump: " + Math.round(jump * 100) / 100 + "    |     Voltage: " + Math.round(voltage * 100) / 100 + "    |    Celsius Temperature " + Math.round(celsius_temperature * 100) / 100);
        res.send("temperature now: " + celsius_temperature);
    };