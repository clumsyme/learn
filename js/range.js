class Range {
    constructor(low, high, step) {
        this.low = high ? low : 0
        this.high = high ? high : low
        this.step = step ? step : 1
    }

    [Symbol.iterator]() {
        return {
            next: () => {
                if (this.low < this.high) {
                    let result = { value: this.low, done: false }
                    this.low += this.step
                    return result
                } else {
                    return { done: true }
                }
            },
        }
    }
}

function range(low, high, step) {
    return new Range(low, high, step)
}


