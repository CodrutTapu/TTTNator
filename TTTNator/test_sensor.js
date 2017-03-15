var five = require("johnny-five");
var board = new five.Board();



function test() {
    board.on("ready", () => {

    var sensor  = new five.Sensor({
        pin: 2, 
        type: "digital",
    });


    console.log("Test Begins");
     sensor.on("change", () => {
        console.log(sensor.value);
    });

    });
}

test();