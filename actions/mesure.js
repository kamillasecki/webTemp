
exports.get = function (req, res){
        var r = 0;
        console.log('Hello world');
        var cylon = require("cylon");
        cylon.robot({
                name:"galileo",
                connections: {galileo: { adaptor: 'intel-iot'} },
                devices: {pin: {driver: 'direct-pin' , pin: 0 } },
                work: function (galileo) {
                        r = galileo.pin.analogRead();
                        console.log("READING" + r);
                }
        }).start();
        
        
        //var Galileo = require("galileo-io");

        //var board = new five.Board({
                //io: new Galileo()
        //});
 
        //var temp = getTemperature();
        
        //var pin = new five.Pin("A0");

        //var temp = pin.read(function(error, value) {
        //  console.log(value);
        //  return value;
        //});
        
        // function getTemperature() {

        //         var THERMISTORNOMINAL = 10000;
        //         var TEMPERATURENOMINAL = 25;
        //         var BCOEFFICIENT = 3950;
        //         var SERIESRESISTOR = 10000 ;
        //         board.pinMode("A0", five.Pin.OUTPUT);
        //         var reading = board.analogRead("A0", function(value) {
        //                 console.log("Value: " + value);
        //                 var r = value;
        //                 return r});
                        
        //         console.log("Reading: " + JSON.stringify(reading));
                
                        
        //         var voltage = (reading * 5.0) / 1023;
        //         var resistance = 1023/reading;
        //         resistance = resistance - 1;
        //         resistance = 8800 / resistance;
                
        //         var steinhart = resistance / THERMISTORNOMINAL;     // (R/Ro)
        //         steinhart = Math.log(steinhart);                  // ln(R/Ro)
        //         steinhart /= BCOEFFICIENT;                   // 1/B * ln(R/Ro)
        //         steinhart += 1.0 / (TEMPERATURENOMINAL + 273.15); // + (1/To)
        //         steinhart = 1.0 / steinhart;                 // Invert
        //         steinhart -= 273.15;                         // convert to C

        //         console.log("Value: " + reading + "   |   voltage: " + voltage + "   |   Resistance: " + resistance + "   |   temp: " + steinhart);
                        
        //         return steinhart;
        // }
        


        res.send("temperature now: " + r);
    };