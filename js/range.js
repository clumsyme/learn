class Range {
    constructor(start, end, step) {
        if (step === 0) {
            throw new Error('range() arg 3 must not be zero')
        }
        this.start = end ? start : 0
        this.end = end ? end : start
        this.step = step ? step : 1
    }

    [Symbol.iterator]() {
        return {
            next: () => {
                if (
                    (this.step > 0 && this.start < this.end) ||
                    (this.step < 0 && this.start > this.end)
                ) {
                    let result = { value: this.start, done: false }
                    this.start += this.step
                    return result
                } else {
                    return { done: true }
                }
            },
        }
    }
}

function range(start, end, step) {
    return new Range(start, end, step)
}

;`
// usage
Array.from(range(5,19,6))
// [5, 11, 17]
range(10)
// Range {start: 0, end: 10, step: 1}
range(6, 12)
// Range {start: 6, end: 12, step: 1}
range(6, 12, 3)
// Range {start: 6, end: 12, step: 3}

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

[...range(20, 7, -3)]
// [20, 17, 14, 11, 8]
`
