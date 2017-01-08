function fib(n) {
    var a = b = 1
    for (let i = 0; i < n; i++) {
        [a, b] = [b, a+b]
        console.log(a)
    }
}
module.exports = fib