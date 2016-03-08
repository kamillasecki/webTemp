exports.get = function(req, res) {
        var r = 0;
        console.log('Hello world');
        var Cylon = require('cylon');

        Cylon.robot({

                connections: {

                        edison: {
                                adaptor: 'intel-iot'
                        }

                },

                //declare and configure the LDR and servo - pins and ranges

                devices: {

                        sensor: {
                                driver: 'analogSensor',
                                pin: 0
                        },

                        aSensor2: {
                                driver: 'analogSensor',
                                pin: 1
                        },
                        
                        dSensor: {
                                driver: 'digitalSensor',
                                pin: 7
                        }

                },

                work: function(my) {

                        var analogValue1 = 0; //variable for LDR input
                        var analogValue2 = 0;
                        var digitalValue = 0;

                        var THERMISTORNOMINAL = 10000;
                        var TEMPERATURENOMINAL = 25;
                        var BCOEFFICIENT = 3984;
                        var SERIESRESISTOR = 10000 ;

                        every((3).second(), function() { //determine how often to run

                        analogValue1 = my.sensor.analogRead(); //read LDR value
                        analogValue2 = my.aSensor2.analogRead();
                        digitalValue = my.dSensor.digitalRead();
                        
                        analogValue1 = 1024 -analogValue1;
                        var voltage = (analogValue1 * 5.0) / 1024;
                        var resistance = 1024/analogValue1;
                        resistance = resistance - 1;
                        resistance = 10000 * resistance;
                        
                        var resistance2 = (5.0 / voltage);

                        var steinhart = resistance / THERMISTORNOMINAL;     // (R/Ro)
                        steinhart = Math.log(steinhart);                  // ln(R/Ro)
                        steinhart /= BCOEFFICIENT;                   // 1/B * ln(R/Ro)
                        steinhart += 1.0 / (TEMPERATURENOMINAL + 273.15); // + (1/To)
                        steinhart = 1.0 / steinhart;                 // Invert
                        steinhart -= 273.15;                         // convert to C
                        
                        console.log("Value: " + analogValue1 + "   |   voltage: " + voltage + "   |   Resistance: " + resistance + "   |   temp: " + steinhart);
                        console.log("analog value2 : " + analogValue2);
                        console.log("digital value : " + digitalValue);
                            

                        });
                res.send("temperature now: " + r);
                }

        }).start();


/*  function getTemperature() {

                var THERMISTORNOMINAL = 10000;
                var TEMPERATURENOMINAL = 25;
                var BCOEFFICIENT = 3950;
                var SERIESRESISTOR = 10000 ;
              
                var reading = board.analogRead("A0", function(value) {
                        console.log("Value: " + value);
                        var r = value;
                        return r});

                console.log("Reading: " + JSON.stringify(reading));


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
        }*/

};