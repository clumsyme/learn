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


//  EXAMPLE 2

class Dog extends events.EventEmitter { }

class Food { }

class Rubbish { }

var tom = new Dog()

var bone = new Food()

var rb = new Rubbish()

tom.on('smell', thing => {
    if (thing instanceof Food) {
        console.log('Tom likes eating wawawa')
    } else if (thing instanceof Rubbish) {
        console.log('What the XXX is this,PEI')
    } else {
        console.log('I want to eat~~~~!')
    }
})

tom.emit('smell', rb)
// What the XXX is this,PEI

tom.emit('smell', {})
// I want to eat~~~~!

tom.emit('smell', bone)
// Tom likes eating wawawa
