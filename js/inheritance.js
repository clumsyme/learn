function Animal(name) {
    this.name = name
}

Animal.prototype = {
    kind : "creature",
    canMove : true,
    move :　function(){
        console.log(this.name + ", I'm moving.")
    },
    say : function(){
        console.log("I'm saying")
    }
}

function Dog(name, age) {
    this.name = name
    this.age = age
    this.say = function(){
        console.log("My name is "+this.name+" and I'm " + this.age + " yesrs old.")
    }
}
Dog.prototype = new Animal()
var tom = new Dog("Tom", 3)
var jerry = new Animal("Jerry")
tom.say()
tom.move()
console.log(tom.kind)
console.log(tom.canMove)
jerry.say()
jerry.move()
console.log(jerry.kind)
console.log(jerry.canMove)