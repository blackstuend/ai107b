var hillClimbing = require("./hillClimbing");      // 引入爬山演算法類別
var solutioncoin = require("../solution/solutioncoin");    // 引入算數字

var hc = new hillClimbing()
var money = process.argv[2];
var s = new solutioncoin(solutioncoin.init(money))
hc.run(s,100000, 1000)
