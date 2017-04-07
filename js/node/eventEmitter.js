var events = require('events')

var emitter = new events.EventEmitter()

let i = 0

emitter.addListener('Add', (n) => {
    i += n
    console.log('After add ' + n + ', i is ' + i)
})

emitter.addListener('Say', (what) => {
    console.log('Said ' + what)
})



for (let i = 1; i < 10; i++) {
    emitter.emit('Add', i)
}
emitter.emit('Say', 'Hello')

console.log(i)

// After add 1, i is 1
// After add 2, i is 3
// After add 3, i is 6
// After add 4, i is 10
// After add 5, i is 15
// After add 6, i is 21
// After add 7, i is 28
// After add 8, i is 36
// After add 9, i is 45
// Said Hello
// 45
