var five = require("johnny-five");
var board = new five.Board({
  port: "COM4"
});

function led_test() {
    board.on("ready", function() {
      console.log("Ready event. Repl instance auto-initialized!");

      var led = new five.Led(13);

       this.repl.inject({
        led: led
      });
    });
}

led_test();