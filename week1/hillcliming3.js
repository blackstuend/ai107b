function f(x,y) {
    return (Math.pow(x, 2) - Math.pow(x, 2) + Math.pow(y, 2) +2*y-8) (-1)
}

function hillcliming() {
    var time = 10
    var max = 10
    var min = -10
    var dx = 0.01
    var bestx = -1, best_result;
    var flag = 0;
    for (var i = 1; i <= 100; i++) {
        var x = Math.random() * (max - min) + min
        var y = Math.random() * (max - min) + min
        while (flag != 1) {
            flag = 1
            var probablity_x = Math.random()  //找機率
            var probablity_y = Math.random()  //找機率
            if (probablity_x >= 0.5) {  //如果random > 0.5 則先做加法
                if (f(x + dx) >= f(x)) {
                    x = dx + x;
                    flag = 0
                }
                else if (f(x - dx) >= f(x)) {
                    x = x - dx;
                    flag = 0
                }
            } else { //  random < 0.5 則先做減法
                if (f(x - dx) >= f(x)) {
                    x = x - dx;
                    flag = 0
                }
                else if (f(dx + x) >= f(x)) {
                    x = dx + x;
                    flag = 0
                }
            }
        }
        if (f(x) >= f(bestx)) {
            bestx = x
            best_result = f(x)
        }
    }
    console.log('f(%f,%f)=%f', bestx.toFixed(4), best_result.toFixed(4))
}