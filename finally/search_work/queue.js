var queue = []
var queen_num = 4;
function get_random_1to_queen_num() { //隨機取得1~8的數字
    return Math.floor(Math.random() * queen_num)
}

function get_one_queen() { //在8*8 的圖案裡 隨機取得一個皇后的位子
    var array = []
    var obj = {}
    for (let i = 0; i < queen_num; i++) {
        var array1 =[]
        for(let j=0;j<queen_num;j++){
            array1.push(0)
        }
        array.push(array1)
    }
    var x = 1
    var y = 0
    array[x][y] = 1;
    obj.queen = array //全部皇后的位址
    obj.queen_location = [] //儲存 所有皇后所在的x,y軸
    obj.queen_location.push([x, y])
    obj.vist_location = {}
    return obj;
}

function find_neighbor(obj, queen_length) {
    queen_length--;
    var x = obj.queen_location[queen_length][0] //取得最新的皇后位址x
    var y = obj.queen_location[queen_length][1] //取得最新的皇后位址y
    for (let i = 0; i <= queen_num; i++) { // 判斷新的皇后附近 不能佔的地方
            if(x-i >=0)
            obj.vist_location[[x - i, y].toString()] = true
            if(x+i<queen_num)
            obj.vist_location[[x + i, y].toString()] = true
            if(y+i <queen_num)
            obj.vist_location[[x, y + i].toString()] = true
            if(y-i>=0)
            obj.vist_location[[x, y - i].toString()] = true
            if(x+i<queen_num && y+i <queen_num)
            obj.vist_location[[x + i, y + i].toString()] = true
            if(x-i>=0 && y-i >=0)
            obj.vist_location[[x - i, y - i].toString()] = true
            if(x+i<queen_num && y-i >=0)
            obj.vist_location[[x + i, y - i].toString()] = true
            if(x-i>=0 && y+i <queen_num)
            obj.vist_location[[x - i, y + i].toString()] = true
    }
    //找尋新的皇后 ，如果找到就推進QUEUE
    for (let i = 0; i < queen_num; i++) { 
        for (let j = 0; j < queen_num; j++) {
            var node = [i, j];
            if (obj.vist_location[node.toString()] != true) {
                var new_obj = JSON.parse(JSON.stringify(obj)) //copy 新的 obj
                new_obj.queen_location.push(node.slice(0))
                new_obj.queen[i][j] = 1
                queue.push(new_obj)
            }
        }
    }
}
function search(q) { //廣度搜尋 7個以上overflow
    var obj = q.shift()
    var queen_length = obj.queen_location.length
    if(queen_length == 0){
        return 
    }
    if (queen_length == queen_num) {
        return console.log(obj.queen_location)
    }
    find_neighbor(obj, queen_length)
    search(queue)
}
var one_queen_obj = get_one_queen()


queue.push(one_queen_obj)
search(queue)