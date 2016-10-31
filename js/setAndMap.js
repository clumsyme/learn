// About Set and Map.
'use strict'
var fruits = ['Apple', 'Pear', 'Banana', 'Peach', 'Watermelon']
var basket = []
var count = new Map()
for (let fruit of fruits) {
    count.set(fruit, 0)
}
for (let i=0; i<10000; i++) {
    index = Math.floor(Math.random() * 5)
    which = fruits[index]
    count.set(which, count.get(which) + 1)
    basket.push(which)
}
for (let [fruit, counts] of basket) {
    console.log('We have ' + counts + ' '  + fruit)
}
var have = new Set(basket)
for (let fruit of have) {
    console.log('We have ' + fruit + ' in basket.')
}
