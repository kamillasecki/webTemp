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

                        servo: {
                                driver: 'servo',
                                pin: 3
                        }

                },

                work: function(my) {

                        var analogValue = 0; //variable for LDR input

                        var servoValue = 0; //variable for servo position
                        var THERMISTORNOMINAL = 10000;
                        var TEMPERATURENOMINAL = 25;
                        var BCOEFFICIENT = 3950;
                        var SERIESRESISTOR = 10000 ;
                        my.servo.angle(servoValue); //servo position

                        every((3).second(), function() { //determine how often to run

                                analogValue = my.sensor.analogRead(); //read LDR value
                        
                                
                                                var voltage = (analogValue * 5.0) / 1024;
                var resistance = 1024/analogValue;
                resistance = resistance - 1;
                resistance = 10000 * resistance;
                
                var resistance2 = ((5.0/voltage) - 1) * 10000;
                

                var steinhart = resistance2 / THERMISTORNOMINAL;     // (R/Ro)
                steinhart = Math.log(steinhart);                  // ln(R/Ro)
                steinhart /= BCOEFFICIENT;                   // 1/B * ln(R/Ro)
                steinhart += 1.0 / (TEMPERATURENOMINAL + 273.15); // + (1/To)
                steinhart = 1.0 / steinhart;                 // Invert
                steinhart -= 273.15;                         // convert to C
                var tempC = BCOEFFICIENT /(Math.log((1025.0 * 10 / analogValue - 10) / 10) + BCOEFFICIENT / 298.0) - 273.0;
                
                

                console.log("Value: " + analogValue + "   |   voltage: " + voltage + "   |   Resistance: " + resistance2 + "   |   temp: " + steinhart + " OR: " + tempC);

                               // console.log('Analog value => ', analogValue); //write LDR value to terminal

                                servoValue = ((-analogValue + 1023) * (180 / 1023)); //map LDR values 0-1023 to servo-friendly 0$

                                servoValue = Math.round(servoValue); //round servo value to nearest integer

                                console.log('Servo Value ===> ', servoValue); //write servo value to terminal

                                my.servo.angle(servoValue); //move servo to new position
                                
                                r = analogValue;

                        });

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



        res.send("temperature now: " + r);
};