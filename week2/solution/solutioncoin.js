var Solution = require('./solution')

function randInt(a, b) { //取a-b以內的
    return a + Math.floor(Math.random() * (b - a))
}
Solution.init = function (money) {  //初始全部轉1元
    let wallet = [money, 0, 0, 0];
    return wallet
}
Solution.prototype.neighbor = function () {
    var choose = randInt(0, 4)
    var wallet = this.v.slice(0)
    var choose_in;
    var wallet_div, walle_rest;
    switch (choose) {
        case 0:  //將1轉成其他數字
            choose_in = randInt(0, 3)
            switch (choose_in) {
                case 0:  //轉5元
                    wallet_div = Math.floor(wallet[0] / 5)
                    walle_rest = wallet[0] % 5
                    wallet[1] += wallet_div
                    wallet[0] = walle_rest
                    break;
                case 1: //轉10元
                    wallet_div = Math.floor(wallet[0] / 10)
                    walle_rest = wallet[0] % 10
                    wallet[2] += wallet_div
                    wallet[0] = walle_rest
                    break;
                case 2: //轉50元
                    wallet_div = Math.floor(wallet[0] / 50)
                    walle_rest = wallet[0] % 50
                    wallet[3] += wallet_div
                    wallet[0] = walle_rest
                    break;
            }
            break;
        case 1:  //將5轉成其他數字
            choose_in = randInt(0, 2)
            switch (choose_in) {
                case 0:
                    wallet_div = Math.floor((wallet[1] / 2))
                    wallet_rest = wallet[1] % 2
                    wallet[2] += wallet_div
                    wallet[1] = wallet_rest
                    break;
                case 1: //轉50元
                    wallet_div = Math.floor(wallet[1] / 10)
                    walle_rest = wallet[1] % 10
                    wallet[3] += wallet_div
                    wallet[1] = walle_rest
                    break;
            }
            break;
        case 2: //將10轉為50
            wallet_div = Math.floor(wallet[2] / 5)
            walle_rest = wallet[2] % 5
            wallet[3] += wallet_div
            wallet[2] = walle_rest
            break;
    }
    return new Solution(wallet)
}
Solution.prototype.energy = function () { //每多一個硬幣多0.2的energy 0.1 =1元 0.3=5元 0.5=10元 0.7=50元
    var wallet = this.v
    var score = 0;
    var num = 0.1
    for (var i = 0; i < wallet.length; i++) {
        score += wallet[i] * num
        num = num + 0.2
    }
    return score;
}
Solution.prototype.toString = function () { 
    var wallet = this.v
    var score = this.energy()
    return `score= ${score} 1元有${wallet[0]} 5元有${wallet[1]} 10元有${wallet[2]} 50元有${wallet[3]} \n`
}
module.exports = Solution;