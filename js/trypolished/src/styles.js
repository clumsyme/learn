var pl = require('polished')

export const ellipsis = {
    ...pl.ellipsis('200px')
}

export const size = {
    ...pl.size('300px', '200px'),
    background: pl.darken(0.2, '#ffffff')
}

export const invert = {
    ...pl.size('300px', '200px'),
    background: pl.invert('#00ff00')
}

export const borders = {
    ...pl.size('200px', '200px'),
    ...pl.borderColor('red', 'green', 'blue', 'yellow'),
    ...pl.borderStyle('solid', 'dashed', 'dotted', 'double')
}