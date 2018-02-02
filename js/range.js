class Range {
    constructor(low, high, step) {
        this.low = high ? low : 0
        this.high = high ? high : low
        this.step = step ? step : 1
    }

    [Symbol.iterator]() {
        return {
            next: () => {
                if (
                    (this.step > 0 && this.low < this.high) ||
                    (this.step < 0 && this.low > this.high)
                ) {
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

;`
// usage
Array.from(range(5,19,6))
// [5, 11, 17]
range(10)
// Range {low: 0, high: 10, step: 1}
range(6, 12)
// Range {low: 6, high: 12, step: 1}
range(6, 12, 3)
// Range {low: 6, high: 12, step: 3}

for (let i of range(3)) {
    console.log(i)
}
// 0
// 1
// 2

[...range(3, 10)]
// [3, 4, 5, 6, 7, 8, 9]

[...range(6, 33, 5)]
// [6, 11, 16, 21, 26]
`
