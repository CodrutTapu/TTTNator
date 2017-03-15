// 2 - x - computer player minimizeaza castigul jucatorului 1 -ex [2,0,1 2,0,0, 0,0,1];
// 1 - 0 - human opponent
//incepe 2

/*
============================================
situatiile in care unul din jucatori a ajuns
castigat, iar jocul a fost finalzat;
============================================
*/
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

/*
============================================
status in care se afla jocul la momentul 
curent;
============================================
*/
var gameStatus = [0,0,0,
                  0,0,0,
                  0,0,0];


var score = 0;

/*
============================================
functie care returneaza daca mai sunt 
disponible miscari in cadrul jocului;
============================================
*/
function getMovesLeft(gameStatus) {
    for (var i = 0; i< gameStatus.length; i++) {
        if (gameStatus[i] == 0 ) {
            return true;
        }
    }
    return false;
}

/*
============================================
functie care returneaza scorul unei tabele 
de de joc;
============================================
*/
function getScore(gameStatus) {
    for (var i = 0; i < wins.length; i++) {

        var a, b ,c;
        a = gameStatus[wins[i][0]];
        b = gameStatus[wins[i][1]];
        c = gameStatus[wins[i][2]];

        if(a == b && a == c && a != 0) {
            if(a == 2) {
                return 10;
            } else if(a == 1) {
                return -10;
            }
        }
    }
    return 0;
}

/*
============================================
functie care implementeaza algoritmul 
minimax;
============================================
*/
function minimax(gameStatus,depth,isMax) {
    var score = getScore(gameStatus);
    if(score == 10 ) {
        return score;
    } else if(score == -10) {
        return score;
    }
    if(getMovesLeft(gameStatus) == false) {
        return 0;
    }
    if (isMax) {
        var best = -1000;
        for (var i = 0; i< gameStatus.length; i++) {
            if(gameStatus[i] == 0) {
                gameStatus[i] = 2;
                best = Math.max(best,minimax(gameStatus, depth + 1, !isMax));
                gameStatus[i] = 0;
            }
        }
        return best;
    } else {
        var best = 1000;
        for (var i = 0; i< gameStatus.length; i++) {
            if(gameStatus[i] == 0) {
                gameStatus[i] = 1;
                best = Math.min(best,minimax(gameStatus, depth + 1, !isMax));
                gameStatus[i] = 0;
            }
        }
        return best;
    }
}

/*
============================================
functie care returneaza cea mai buna miscare
pe care computerul o poate face;
============================================
*/
function findBestMove(gameStatus) {
    var bestVal = -1000;
    var bestMove = -1;
    for (var i = 0; i< gameStatus.length; i++) {
        if(gameStatus[i] == 0) {
            gameStatus[i] = 2;
            var moveVal = minimax(gameStatus, 0, false);
            gameStatus[i] = 0;
            if(moveVal > bestVal) {
                bestMove = i;
                bestVal = moveVal;
            }
        }
    }
    return bestMove;
}

/*
============================================
functii necesare realizarii interfatii in 
html;
============================================
*/
function main() {
    bm = findBestMove(gameStatus);
    console.log(bm);
}

function renderTable() {
    for (var i = 0; i< gameStatus.length; i++) {
        var selector = ".box" + i;
        if( gameStatus[i]== 1 ) {
            $(selector).html("O");
        } else if(gameStatus[i]==2) {
            $(selector).html("X");
        } else if(gameStatus[i]==0) {
            $(selector).html("_");
        }
    }

}

function nextMove() {
    var value = $('.next-move').val();
    $('.next-move').val('');
    gameStatus[value] = 1;
    renderTable();
    if(getScore(gameStatus) == -10) {
        $('.winner').html("<h1>User Wins</h1>");
    }
    if(getMovesLeft(gameStatus) != 0) {
        nextAiMove();
    }
    if(getMovesLeft(gameStatus) == 0) {
        $('.winner').html("<h1>Draw</h1>");
    }
}

function nextAiMove() {
    bm = findBestMove(gameStatus);
    gameStatus[bm] = 2;
    renderTable();
    if(getScore(gameStatus) == 10) {
        $('.winner').html("<h1>AI Wins</h1>");
    }
    if(getMovesLeft(gameStatus) == 0) {
        $('.winner').html("<h1>Draw</h1>");
    }
}