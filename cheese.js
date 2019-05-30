const size = 12
const score_stand = {
    "10111": 720, "011110": 4320, "011100": 720, "001110": 720, "011010": 720, "010110": 720, "11110": 720, "01111": 720, "11011": 720, "11111": 50000, "11101": 720,
    "001100": 120, "001010": 120, "010100": 120, "000100": 20, "001000": 20
}

function init() { //create clear board 
    var board = [];
    for (var i = 0; i < size; i++) {
        var array = []
        for (var j = 0; j < size; j++) {
            array[j] = 0;
        }
        board.push(array);
    }
    return board;
}
function get_score(pattern) {
    for (let i of Object.keys(score_stand)) {
        if (pattern.includes(i))
            return score_stand[i]
    }
    return 0;
}
function array2word(word){
    console.log(word)
    return word.toString().replace(/,/g,'')
}
function score_evalute(board, x, y, turn) { //get score , turn have black(b) or white(w) 
    var score=0;
    var top_down=[], left_right=[], slope_1=[], slope_2=[]; //上下的樣子
    board[x][y] = turn;
    console.log(board)
    for (let i = -4; i <= 4; i++) {
        //top and down
        if (x + i >= 0 && x+i<=size) {
            if(board[x+i][y] == turn)
            top_down.push('1');
            else if(board[x+i][y] == 0)
            left_right.push('0')
            else
            left_right.push('x')
        }
        //left_right
        if (y + i >= 0 && y+i<=size) {
            if(board[x][y+i] == turn){
            left_right.push('1');
            }
            else if(board[x][y+i] == 0)
            left_right.push('0')
            else
            left_right.push('x')
        }
        // 斜率為1
        if(x+i>=0 && y+i>=0 && x+i<=size && y+i <=size)
        {
            if(board[x+i][y+i]== turn)
            slope_1 += '1';
            else(board[x+i][y+i] == 0)
            slope_1 += '0'
        }
        //斜率為-1
        // if(x+i>=0 && y-i<=size && x+i<=size && y-i>=0){
        //     if(board[x-i][y+i] == turn)
        //     slope_2 +='1';
        //     else
        //     slope_2 +='0'
        // }
    }
    score+= get_score(array2word(top_down))
    score+= get_score(array2word(left_right))
    // score+= get_score(array2word(slope_1))
    // score += get_score(slope_2)
    return score;
}
var board = init();
board[0][0]='b'
board[0][1]='b'
board[0][2]='b'
board[0][6]='w'
console.log(score_evalute(board,0,3,'b'))
