var fs = require("fs");
var sleep = require('system-sleep');

var take_tool_flag = false;
var draw_table_flag = false;
var first_move_flag = true;
var robot_turn = false;
var human_turn = false;
var winner = 0;
var wins = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
var gamestate = [0,0,0,0,0,0,0,0,0];

function verifyWinner(gamestate,wins){
    for(var i = 0; i < wins.length; i++){

        var a, b ,c;
        a = gamestate[wins[i][0]];
        b = gamestate[wins[i][1]];
        c = gamestate[wins[i][2]];

        if(a == b && a == c && a != 0){
            return a;
        }
    }
    return 0;
}

function take_tool() {
    while(take_tool_flag == false) {
        if(fs.existsSync('D:/flag.txt')) {
            fs.writeFileSync('D:/input_robot.txt', '-1');
            console.log('Robot is taking the tool!');
            fs.unlinkSync('D:/flag.txt');
            take_tool_flag = true;
        }
    }
}

function draw_table() {
    while(draw_table_flag == false && take_tool_flag == true) {
        if(fs.existsSync('D:/flag.txt')) {
            fs.writeFileSync('D:/input_robot.txt', '-3');
            console.log('Robot is drawing the table game!');
            fs.unlinkSync('D:/flag.txt');
            draw_table_flag = true;
        }
    }
}

function first_move() {
    while(first_move_flag == true && take_tool_flag == true && draw_table_flag == true) {
        if(fs.existsSync('D:/flag.txt')) {
            var option = Math.round(Math.random()*8+1);
            var first_x;
            fs.writeFileSync('D:/input_robot.txt', option);
            console.log('Robot is taking his first move!');
            fs.unlinkSync('D:/flag.txt');
            first_move_flag = false;
        }
    }
}


function game() {

    console.log("Game has started!");

    fs.writeFileSync('D:/input_robot.txt', '-99');

    take_tool();

    draw_table();

    /*while(winner == 0) {
        //robot turn
        while(fs.existsSync('D:/flag.txt') && robot_turn == false) {
            var robot_option = Math.round(Math.random()*8);
            gamestate[robot_option] = 1;
            fs.writeFileSync('D:/input_robot.txt', robot_option + 1);
            console.log(gamestate);
            fs.unlinkSync('D:/flag.txt');
            robot_turn = true;
        }
        //human turn
        while(fs.existsSync('D:/flag.txt') && human_turn == false && robot_turn == true) {
            var robot_option = Math.round(Math.random()*8);
            gamestate[robot_option] = 2;
            fs.writeFileSync('D:/input_robot.txt', robot_option + 1);
            console.log(gamestate);
            fs.unlinkSync('D:/flag.txt');
            robot_turn = false;
        }
        //read
        //verify winner
    }*/

    first_move();

    console.log("Game has ended!");
}

game();