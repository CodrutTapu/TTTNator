var fs = require("fs");
var five = require("johnny-five");
var sleep = require('system-sleep');

var board = new five.Board({
    port: "COM4"
});

var gamestate = [0,0,0,0,0,0,0,0,0];

board.on("ready", () => {

    var sensor  = new five.Sensor({
        pin: 2, 
        type: "digital"
    });

    var i = 0;

    fs.writeFileSync('D:/input_robot.txt', '-4');

    console.log('Read sequence begin!');
    sleep(3375);
    sensor.on("data", () => {
        console.log(i);
        gamestate[i] = sensor.value;
        if(i == 2 || i == 5) {
            sleep(1575)
        } else {
            sleep(875);
        }
        if(i==8) {
            console.log(gamestate);
        }
        i++;
    });

});
