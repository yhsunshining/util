var $ = require('../lib/util');
window.util = $;
console.log(window.util)

var a = function(board) {
    let len = board.length;
    for(let i=0;i<len;i++){
        let arr = [...board[i]].filter(function(item){
            if(item != '.'){
                return true;
            }
            return false;
        })
        if(arr.length != new Set(arr).size){
            return false;
        }
    }

    for(let i=0;i<len;i++){
        let arr = [];
        for(let j=0;j<len;j++){
            var tem = board[j][i];
            if(tem != '.'){
                arr.push(tem);
            }
        }
        if(arr.length != new Set(arr).size){
            return false;
        }
    }

    for(let i=0;i<len;i+=3){
        for(let j=0;j<len;j+=3){
            let arr =[]
            for(var m=0;m<3;m++){
                for(var n=0;n<3;n++) {
                    var num = board[i+m][j+n];
                    console.log(num)
                    if(num != '.'){
                        arr.push(num)
                    }
                }
            }
            if(arr.length != new Set(arr).size){
                return false;
            }
        }
    }
    return true;
};
console.log(a([".87654321","2........","3........","4........","5........","6........","7........","8........","9........"])
)
