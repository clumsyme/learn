// make clear some JavaScript References

// for ... in & for ... of statement
// The for...in loop will iterate over all enumerable properties of an object.
// The for...of syntax is specific to collections, rather than all objects. 
// It will iterate in this manner over the elements of any collection that
//  has a [Symbol.iterator] property.
var dog = {
    name: "Tom",
    age: 3,
    bark: function() {
        alert(this.name)
    }
}
for (let attr in dog) {
    console.log(attr)
}
// different *property name* is assigned to attr in for ... in statement
// name
// age
// bark

for (let n of [3, 6, 9]) {
    console.log(n)
}
// different *property value* is assigned to n in for ... of statement
// 3
// 6
// 9

// *this* is acturally which

// In the global execution context (outside of any function), 
// this refers to the global object, whether in strict mode or not.
console.log(this)

// as method
dog.bark() //Tom

// Inside a function, the value of this depends on how the function is called.
// Simple call
// *this* is global object(window in browser or global in node)
function f1() { return this } // window/global
// *this* remains at whatever it was set to when entering the execution context
function f2() { 'use strict'; return this } //undefined

// *call* can bound *this* to a object
function say() { console.log(this.name) }
say.call(dog) // Tom (this in the say function bounded to dog)
// *bind* return a function whose this is binded to the parameter of bind
dogsay = say.bind(dog)
dogsay() //Tom

// array function
// *this* in array function will STAY THE SAME once it was defined.
var name = "Hello"
var miao = (() => this.name)
var cat = { name: "Kitty", miao: miao }
miao() === "Hello"
cat.miao() === "Hello"
miao.call(cat) === "Hello"
miao = miao.bind(cat); miao() === "Hello"

var student = {
    duty: "study",
    do: function() {
        whattodo = () => this.duty
        return whattodo
    } 
}
var sd = student.do()
sd() // study
sd.bind(window)() //study
sd.call(window) //study

// As an object method
// When a function is called as a method of an object, 
// its this is set to the object the method is called on.
dog.bark() // Tom
// even the method is set to the obj later.
function walk() { console.log(this.name + ' is walking.') }
dog.walk = walk
dog.walk() // Tom is walking.

// the this binding is only affected by the most immediate member reference.
dog.sth = {name:"hi", walk: walk}
dog.sth.walk() // hi

// As a constructor
// When a function is used as a constructor (with the new keyword),
//  its this is bound to the new object being constructed.
function Cat() {
    this.name = "Luku"
}
var c = new Cat()
c.name // Luke
function C2(){
  this.a = 37;
  return {a:38};
}
var cc = new C2(); cc.a // 38---> Cause the return make the constructor stopped


// As a DOM event handler
// When a function is used as an event handler, its this is set to the 
// element the event fired from (some browsers do not follow this convention for
//  listeners added dynamically with methods other than addEventListener).
var element = document.getElementById('1')
element.onclick = function(e) {
    console.log(this === e.currentTarget) // True
}
// In an in–line event handler
// When code is called from an in–line on-event handler, 
// its this is set to the DOM element on which the listener is placed:
// <button onclick="alert(this.tagName.toLowerCase());">
//   Show this
// </button>

// Note however that only the outer code has its this set this way:
// <button onclick="alert((function(){return this})());">
//   Show inner this
// </button>
// In this case, the inner function's this isn't set so it returns the
//  global/window object (i.e. the default object in 
//  non–strict mode where this isn't set by the call).

// 最后箭头函数作为方法与普通匿名函数有所不同。即箭头函数并不自动bind，不产生自己的this
// student例子中的箭头函数是在function匿名函数内部因此this有所制定
var pig = {
    name: 'Piggy',
    say: function() {
        console.log(this.name + ' Hengheng')
    },
    walk: () => { console.log(this.name + ' walking') }
}
pig.say() // Piggy Hengheng
pig.walk() // Hello walking