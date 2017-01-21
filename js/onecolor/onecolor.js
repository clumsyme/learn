// Code by (c) LiYan
'use strict'

var buttons = document.querySelector('#buttons')
var board = document.querySelector('#board')
var clickedDom = document.querySelector('#clicked')
const COLORS = ['yellowgreen', 'darkslategrey', 'teal', 'purple', 'darkorange']
const MAXCLICK = 20
const ROW = 10
const COLUMN = 10

// 将第i行第j列的fromColor颜色的方块设置为toColor颜色
// 并递归将其上下左右的fromColor颜色的方块使用此函数处理
function setSquare(fromColor, toColor, i, j, squares) {
    if (fromColor == toColor) {return}
    squares[i][j].style.backgroundColor = toColor
    if (i > 0 && squares[i-1][j].style.backgroundColor == fromColor) {
        setSquare(fromColor, toColor, i-1, j, squares)
    }
    if (j > 0 && squares[i][j-1].style.backgroundColor == fromColor) {
        setSquare(fromColor, toColor, i, j-1, squares)
    }
    if (i < ROW - 1 && squares[i+1][j].style.backgroundColor == fromColor) {
        setSquare(fromColor, toColor, i+1, j, squares)
    }
    if (j < COLUMN - 1 && squares[i][j+1].style.backgroundColor == fromColor) {
        setSquare(fromColor, toColor, i, j+1, squares)
    }
}

// 从0， 0开始将于0， 0颜色相同并相连的方块颜色设置为color
function setColor(color) {
    var squares = Array.from(document.querySelectorAll('ul')).map(
        function(ul) {
            return Array.from(ul.querySelectorAll('li'))
        }
    )
    setSquare(squares[0][0].style.backgroundColor, color, 0, 0, squares)
}

function checkWin() {
    var squares = Array.from(document.querySelectorAll('li'))
    var color = squares[0].style.backgroundColor
    // 部分浏览器还未支持NodeList的for...of迭代
    for (var square of squares) {
        if (square.style.backgroundColor !== color) {
            return false
        }
    }
    return true
}

// 处理点击
function handleClick (e) {
    var color = e.target.id
    setColor(color)
    clickedDom.textContent--
    if (clickedDom.textContent == 0) {
        if (checkWin()) {
            document.querySelector('#win').style.display = 'flex'
        } else {
            document.querySelector('#lose').style.display = 'flex'
        }
    }
    if (checkWin()) {
        document.querySelector('#win').style.display = 'flex'
    }
}

function newGame() {
    clickedDom.textContent = MAXCLICK
    document.querySelector('#win').style.display = 'none'
    document.querySelector('#lose').style.display = 'none'
    var squares = Array.from(document.querySelectorAll('li'))
    squares.forEach(
        function (element) {
            element.style.backgroundColor = COLORS[Math.floor(Math.random() * COLORS.length)]
        }
    );
}

for (let color of COLORS) {
    let button = document.createElement("button")
    button.id = color
    button.style.backgroundColor = color
    button.onclick = handleClick
    buttons.appendChild(button)
}

for (let i = 0; i < ROW; i++) {
    let ul = document.createElement('ul')
    for (let j = 0; j < COLUMN; j++) {
        let li = document.createElement('li')
        ul.appendChild(li)
    }
    board.appendChild(ul)
}

newGame()