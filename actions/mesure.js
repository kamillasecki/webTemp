
exports.get = function (req, res){
        console.log('Hello world');
        var five = require("johnny-five");
        var Galileo = require("galileo-io");

        var board = new five.Board({
                io: new Galileo()
        });
 
        var temp = getTemperature();
        
        function getTemperature() {

                var THERMISTORNOMINAL = 10000;
                var TEMPERATURENOMINAL = 25;
                var BCOEFFICIENT = 3950;
                var SERIESRESISTOR = 10000 ;
                board.pinMode(7, five.Pin.OUTPUT);
                var reading = board.analogRead(0, function(value) {
                        console.log("Value: " + value);
                        return value*1});
                        
                console.log("Reading: " + reading);
                
                        
                var voltage = (reading * 5.0) / 1023;
                var resistance = 1023/reading;
                resistance = resistance - 1;
                resistance = 8800 / resistance;
                
                var steinhart = resistance / THERMISTORNOMINAL;     // (R/Ro)
                steinhart = Math.log(steinhart);                  // ln(R/Ro)
                steinhart /= BCOEFFICIENT;                   // 1/B * ln(R/Ro)
                steinhart += 1.0 / (TEMPERATURENOMINAL + 273.15); // + (1/To)
                steinhart = 1.0 / steinhart;                 // Invert
                steinhart -= 273.15;                         // convert to C

                console.log("Value: " + reading + "   |   voltage: " + voltage + "   |   Resistance: " + resistance + "   |   temp: " + steinhart);
                        
                return steinhart;
        }
        


        res.send("temperature now: " + temp);
    };