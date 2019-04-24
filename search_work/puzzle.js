var correct_puz = [[1, 2, 3],
[8, 0, 4],
[7, 6, 5]]

var start_puz =
    [[1, 3, 4],
    [8, 2, 5],
    [7, 0, 6]]
var start_x = 2 //0的位址 x代表一維的
var start_y = 1 //0的位址 y代表二維的
var dir = 1
var obj = []
obj.push({ puzzle: start_puz, dir: 0, x: start_x, y: start_y, old_puzzle: null })
function search(obj) { //傳入陣列 0的位置 方向 廣度搜尋
    var old_obj = obj.shift() //從物件裡面取最前面的的出來
    if (old_obj.puzzle.toString() == correct_puz.toString()) {
        console.log(old_obj.puzzle)
        return old_obj.old_puzzle
    }
    var x = old_obj.x, y = old_obj.y
    var memory;
    if (old_obj.dir != 3) { //如果上一次走的不是上面(避免換到一樣的)，那就把0跟上面那個調換
        // var new_obj = Object.assign({}, old_obj); //創一個新的obj來存改變位置過的內容
        var new_obj = JSON.parse(JSON.stringify(old_obj))
        if (x - 1 >= 0) { //如果是可以換得就把他換了然後丟進obj裡面
            memory = new_obj.puzzle[x - 1][y]
            new_obj.puzzle[x - 1][y] = new_obj.puzzle[x][y]
            new_obj.puzzle[x][y] = memory
            new_obj.dir = 1
            new_obj.x = x - 1
            new_obj.old_puzzle = old_obj.puzzle
            obj.push(new_obj)
        }
    }
    if (old_obj.dir != 4) { //如果上一次走的不是上面(避免換到一樣的)，那就把0跟上面那個調換
        var new_obj = JSON.parse(JSON.stringify(old_obj)) //複製一個新的json
        if (y + 1 <= 2) { //如果是可以換得就把他換了然後丟進obj裡面
            memory = new_obj.puzzle[x][y + 1]
            new_obj.puzzle[x][y + 1] = new_obj.puzzle[x][y]
            new_obj.puzzle[x][y] = memory
            new_obj.dir = 2
            new_obj.y = y + 1
            new_obj.old_puzzle = old_obj.puzzle
            obj.push(new_obj)
        }
    }
    if (old_obj.dir != 1) { //如果上一次走的不是上面(避免換到一樣的)，那就把0跟上面那個調換
        var new_obj = JSON.parse(JSON.stringify(old_obj))
        if (x + 1 <= 2) { //如果是可以換得就把他換了然後丟進obj裡面
            memory = new_obj.puzzle[x + 1][y]
            new_obj.puzzle[x + 1][y] = new_obj.puzzle[x][y]
            new_obj.puzzle[x][y] = memory
            new_obj.dir = 3
            new_obj.x = x + 1
            new_obj.old_puzzle = old_obj.puzzle
            obj.push(new_obj)
        }
    }
    if (old_obj.dir != 2) { //如果上一次走的不是上面(避免換到一樣的)，那就把0跟上面那個調換
        var new_obj = JSON.parse(JSON.stringify(old_obj))
        if (y - 1 >= 0) { //如果是可以換得就把他換了然後丟進obj裡面
            memory = new_obj.puzzle[x][y - 1]
            new_obj.puzzle[x][y - 1] = new_obj.puzzle[x][y]
            new_obj.puzzle[x][y] = memory
            new_obj.dir = 4
            new_obj.y = y - 1
            new_obj.old_puzzle = old_obj.puzzle
            obj.push(new_obj)
        }
    }
    var result = search(obj)
    if (result != null) {
        if (result.toString() == old_obj.puzzle.toString()) {
            console.log(result)
            return old_obj.old_puzzle
        }
        else
        return result
    }
}
search(obj)