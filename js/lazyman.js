class _LazyMan {
    constructor(name) {
        this.name = name
        this.tasks = []
        this.tasks.push(() => {
            console.log('Hi, this is ' + this.name)
            this.next()
        })
        setTimeout(() => {
            this.next()
        }, 0);
    }

    next() {
        var todo = this.tasks.shift()
        todo && todo()
    }

    eat(food) {
        this.tasks.push(() => {
            console.log(this.name + ' eating ' + food)
            this.next()
        })
        return this
    }

    watch(movie) {
        this.tasks.push(() => {
            console.log(this.name + ' watching ' + movie)
            this.next()
        })
        return this
    }

    sleep(time) {
        this.tasks.push(() => {
            setTimeout(() => {
                console.log(this.name + ' sleep for ' + time)
                this.next()
        }, time*1000);    
        })
        return this
    }
    sleepfirst(time) {
        this.tasks.unshift(() =>  {
            setTimeout(() =>  {
                console.log(this.name + ' wakeup after ' + time)
                this.next()
        }, time*1000)           
        })
        return this
    }
}
function LazyMan(name) {
    return new _LazyMan(name)
}

LazyMan('Tom').watch('Star Wars').eat('apple').watch('The Lord Of The Rings').sleep(3).eat('orange').sleepfirst(5)