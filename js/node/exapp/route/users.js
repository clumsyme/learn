var express = require('express')
var router = express.Router()

var fib = function(n) {
    var a = b = 1
    for (let i = 0; i < n; i++) {
        [a, b] = [b, a+b]
    }
    return a
}

var yh = function(n) {
    if (n == 0){
        return [1]
    } else {
        var pre = yh(n-1),
        this1 = [0].concat(pre),
        this2 = pre.concat([0]),
        thisr = []
        for (let i=0, length=this1.length; i<length; i++) {
            thisr.push(this1[i] + this2[i])
        }
    return thisr
    }
}

var users = [
    {
        name: 'Taylor Swift',
        age: 27
    },
    {
        name: 'Scarlett Johansson',
        age: 31
    },
    {
        name: 'Sophie Turner',
        age: 18
    }
]

router.get('/', function(req, res){
    res.render('users', {
        users: users,
        fib: fib,
        yh: yh
    })
})

module.exports = router