var arr = [] //arr save all queue
var check_obj = {} //check neighbor 是否 重複
var correct_thing = [1, 1, 1, 1]
function change_num(num) { //將數字調換
    if (num == 1)
        return 0
    else
        return 1
}

var correct_move =[]


function check_save(array) {
    var str_arr = array.toString()
    if (!check_obj[str_arr]) {
        if (array[0] == array[1] && array[1] == array[2])
            return true
        else if (array[0] == array[2] && array[2] == array[3])
            return true
        else if (array[1] != array[2] && array[2] != array[3])
            return true
        return false
    }
    return false
}

function find_neighbor(obj) { //找鄰居
    for (let i = 0; i <= 3; i++) {  //分別在每一個動物或菜都做交換一次
        switch (i) {
            case 0: //0 代表 只有人動
                var new_obj = JSON.parse(JSON.stringify(obj)) //copy 新的 obj
                new_obj.thing[0] = change_num(new_obj.thing[0])
                if (check_save(new_obj.thing)) {
                    check_obj[str_thing] = true
                    new_obj.last_thing = obj.thing.slice(0)
                    arr.push(new_obj)
                }
            case 1: //1 人跟狼一起
                var new_obj = JSON.parse(JSON.stringify(obj)) //copy 新的 obj
                new_obj.thing[0] = change_num(new_obj.thing[0])
                new_obj.thing[1] = change_num(new_obj.thing[1])
                if (check_save(new_obj.thing)) {
                    check_obj[str_thing] = true
                    new_obj.last_thing = obj.thing.slice(0)
                    arr.push(new_obj)
                }
            case 2: //人跟羊
                var new_obj = JSON.parse(JSON.stringify(obj)) //copy 新的 obj
                new_obj.thing[0] = change_num(new_obj.thing[0])
                new_obj.thing[2] = change_num(new_obj.thing[2])
                var str_thing = new_obj.thing.toString()
                if (check_save(new_obj.thing)) {
                    check_obj[str_thing] = true
                    new_obj.last_thing = obj.thing.slice(0)
                    arr.push(new_obj)
                }
            case 3: //人跟菜
                var new_obj = JSON.parse(JSON.stringify(obj)) //copy 新的 obj
                new_obj.thing[0] = change_num(new_obj.thing[0])
                new_obj.thing[3] = change_num(new_obj.thing[3])
                var str_thing = new_obj.thing.toString()
                if (check_save(new_obj.thing)) {
                    check_obj[str_thing] = true
                    new_obj.last_thing = obj.thing.slice(0)
                    arr.push(new_obj)
                }
        }
    }
}

function search(array) { //廣度優先
    var thing = array.shift() //取第一個
    if (thing.thing.toString() == correct_thing.toString())
    {
        console.log(thing.thing)
        return thing.last_thing
    }
    //=========find neighbor=====
    find_neighbor(thing)
    //========find neighbor======
    var result = search(arr) //result was last thing
    if (result.toString() == thing.thing.toString()) {
        console.log(result)
        return thing.last_thing
    } else
        return result
}
arr.push({ thing: [0, 0, 0, 0], last_thing: null }) //thing 分別代表 人 狼 羊 菜 lasthing紀錄上一個 action 代表去 或回來
search(arr)