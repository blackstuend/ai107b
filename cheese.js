const size = 10
const readline = require('readline');
const score_stand = {
    "10111": 720, "011110": 4320, "011100": 720, "001110": 720, "011010": 720, "010110": 720,
    "11110": 720, "01111": 720, "11011": 720, "11111": 50000, "11101": 720,
    "001100": 120, "001010": 120, "010100": 120, "000100": 20, "001000": 20,"011":30,"110":30
}
const score_pattern = ['11111', "011110", "011100", "001110", "011010", "010110", "11110", "01111", "11011", "10111", "11101", "001100", "001010", "010100","011","110", "000100", "001000"]
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
    for (let i of score_pattern) {
        if (pattern.includes(i))
            return score_stand[i]
    }
    return 0;
}

function array_copy(old_array) {
    var array = []
    for (let i = 0; i < size; i++) {
        var array1 = []
        for (let j = 0; j < size; j++) {
            array1[j] = old_array[i][j]
        }
        array.push(array1)
    }
    return array
}
function array2word(word) {
    return word.toString().replace(/,/g, '')
}


function score_evalute(board, x, y, turn) { //get score , turn have black(b) or white(w) 
    var score = 0;
    var top_down = [], left_right = [], slope_1 = [], slope_2 = []; //上下的樣子
    for (let i = -4; i <= 4; i++) {
        //top and down
        if (x + i >= 0 && x + i < size) {
            if (board[x + i][y] == turn)
                top_down.push('1');
            else if (board[x + i][y] == 0)
                left_right.push('0')
            else
                left_right.push('x')
        }
        //left_right
        if (y + i >= 0 && y + i < size) {
            if (board[x][y + i] == turn) {
                left_right.push('1');
            }
            else if (board[x][y + i] == 0)
                left_right.push('0') 
            else
                left_right.push('x')
        }
        // 斜率為-1
        if (x + i >= 0 && y + i >= 0 && x + i < size && y + i < size) {
            if (board[x + i][y + i] == turn)
                slope_1.push('1')
            else if (board[x + i][y + i] == 0)
                slope_1.push('0')
            else
                slope_1.push('x')
        }
        // 斜率為1
        if (x + i >= 0 && y - i < size && x + i < size && y - i >= 0) {
            if (board[x + i][y - i] == turn)
                slope_2.push('1')
            else if (board[x + i][y - i] == 0)
                slope_2.push('0')
            else
                slope_2.push('x')
        }
    }
    score += get_score(array2word(top_down))
    score += get_score(array2word(left_right))
    score += get_score(array2word(slope_1))
    score += get_score(array2word(slope_2))
    if (score >= 50000)
        return 50000;
    return score;
}

function check_empty(board, x, y) {
    if (board[x][y] == 0)
        return true
    else
        return false
}
function check_neighbor(board) {
    if (visit[board.toString()])
        return false
    return true
}
var neighbor = {}

function check_visit(board) {
    if (visit[board.toString()])
        return true;
    return false
}
var visit = {}
function find_some_neighbors(board, x,y,turn) {
    var array = []
    var range = 4;
    for (let i = -4; i <= 4; i++) {
        for (let j = -4; j <= 4; j++) {
            if(i == 0 && j ==0)
            continue;
            if(x+i >=0 && j+i >=0 && x+i<size && j+1<size){
                if (check_empty(board, x+i, y+j)) {
                    var new_board = array_copy(board)
                    // if (!check_visit(new_board)) 
                    {
                        new_board[x+i][j+y] = turn;
                        array.push([x+i, j+y])
                        visit[new_board.toString()] = true
                    }
                 }
            }
        }
    }
    return array
}
function find_neighbors(board, x,y,turn) {
    var array = []
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (check_empty(board, i, j)) {
                var new_board = array_copy(board)
                new_board[i][j] = turn;
                if (!check_visit(new_board)) {
                    array.push([i, j])
                    visit[new_board.toString()] = true
                }
            }
        }
    }
    return array
}
function min_max(board, x,y,deep, max_deep = 2)  {
    var visit = {}
    var max_score = -100000
    var best_pos = []
    var neighbors = find_some_neighbors(board,x,y,'w')
    for (neighbor of neighbors) {
        var new_board = array_copy(board)
        new_board[neighbor[0]][neighbor[1]] = 'w'
        var current_x =neighbor[0]
        var current_y =neighbor[1]
        var score = min(new_board, current_x,current_y, deep + 1, max_deep)
        console.log(score)
        if (score == max_score) {
            best_pos.push({ best_x: current_x, best_y:  current_y })
        }
        else if (score > max_score) {
            best_pos = []
            max_score = score;
            best_pos.push({ best_x: current_x, best_y:  current_y })
        }
    }
    return best_pos
}
 
function min(board, x, y, deep, max_deep) {
    var score = score_evalute(board, x, y, 'w')
    var min_score = 1000000
    if (deep == max_deep || score >= 1400) {
        return score;
    }
    var neighbors =  find_some_neighbors(board,x,y,'b')
    for (neighbor of neighbors) {
        var current_x =neighbor[0]
        var current_y =neighbor[1]
        var new_board = array_copy(board)
        new_board[neighbor[0]][neighbor[1]] = 'b'
        var score = max(new_board, x,  y , deep + 1, max_deep)
        score = -score;
        if (min_score > score)
            min_score = score;
    }
    if(neighbors.length == 0)
    return 0;
    return min_score
}


function max(board, x, y, deep, max_deep) {
    var score = score_evalute(board, x, y, 'b')
    var max_score = 0
    if (deep == max_deep || score >= 1400) {
        return score;
    }
    var neighbors = find_some_neighbors(board,x,y,'w')
    for (neighbor of neighbors) {
        var current_x =neighbor[0]
        var current_y =neighbor[1]
        var new_board = array_copy(board)
        new_board[current_x][current_y] = 'w'
        var score = min(new_board,x, y, deep + 1, max_deep)
        if (max_score < score)
            max_score = score;
    }
    if(neighbors.length == 0)
    return 100000;
    return max_score
}

function show_board(board){
    var word = '' ;
    for(let i =0 ;i<size;i++){
        word += board[i].join(' ');
        word += '\n'
    }
    console.log( word);
}
function random_array(array){
    let len = array.length;
    return array[Math.floor(Math.random()*len)]
}
function main(){
    var board = init()
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      show_board(board)
      rl.on('line', (input) => {
        board[input[0]][input[1]] = 'b'
        show_board(board)
        let best_steps = min_max(board,input[0]-0,input[1]-0,0,2)
        let best_step = random_array(best_steps)
        board[best_step.best_x][best_step.best_y] = 'w'
        show_board(board)
      });
}
main()