// Code by (c) LiYan
'use strict'
var colors = ['yellowgreen', 'darkslategrey', 'teal', 'purple', 'darkorange']
var buttons = document.querySelector('#buttons')
var board = document.querySelector('#board')
var clickedDom = document.querySelector('#clicked')
var clicked = 0
const MAXCLICK = 20

// 将current周围color颜色的方块都设置为current类
console.warn('此算法有误，从下到上可能算不到')

function checkCurrent(color, i, j, squares) {
    squares[i][j].className = 'current'
    if (i>0 && squares[i-1][j].style.backgroundColor == color && squares[i-1][j].className !== 'current') {
        checkCurrent(color, i-1, j, squares)
    }
    if (j>0 && squares[i][j-1].style.backgroundColor == color && squares[i][j-1].className !== 'current') {
        checkCurrent(color, i, j-1, squares)
    }
    if (i<9 && squares[i+1][j].style.backgroundColor == color && squares[i+1][j].className !== 'current') {
        checkCurrent(color, i+1, j, squares)
    }
    if (j<9 && squares[i][j+1].style.backgroundColor == color && squares[i][j+1].className !== 'current') {
        checkCurrent(color, i, j+1, squares)
    }

}

function setCurrentTwo(color) {
    var squares = Array.from(document.querySelectorAll('ul')).map(
        function(ul) {
            return Array.from(ul.querySelectorAll('li'))
        }
    )
    checkCurrent(color, 0, 0, squares)
}









var setCurrent = function (color) {
    var squares = Array.from(document.querySelectorAll('ul')).map(
        function(ul) {
            return Array.from(ul.querySelectorAll('li'))
        }
    )
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (squares[10 * i + j].className == 'current') {
                if (i < 9 && squares[10 * (i + 1) + j].style.backgroundColor == color) {
                    squares[10 * (i + 1) + j].className = 'current'
                }
                if (j < 9 && squares[10 * i + j + 1].style.backgroundColor == color) {
                    squares[10 * i + j + 1].className = 'current'
                }
                if (i > 0 && squares[10 * (i - 1) + j].style.backgroundColor == color) {
                    squares[10 * (i - 1) + j].className = 'current'
                }
                if (j > 0 && squares[10 * i + j - 1].style.backgroundColor == color) {
                    squares[10 * i + j - 1].className = 'current'
                }
            }
        }
    }
}

var checkWin = function () {
    var squares = document.querySelectorAll('li')
    // for...of迭代（NodeList.prototype[Symbol.iterator]）在Edge中还未支持NodeList
    // Chrome-54, FF-50
    for (let square of Array.from(squares)) {
        if (square.className !== 'current') {
            return false
        }
    }
    return true
}

// 处理点击
var handleClick = function (e) {
    clicked++
    var color = e.target.id
    
    // IE 不支持 NodeList.forEach 方法(Chrome-51, FF-50)
    Array.from(document.querySelectorAll('.current')).forEach(
        function (element) {
            element.className = ""
            element.style.backgroundColor = color
        }
    );
    setCurrentTwo(color)
    clickedDom.textContent = MAXCLICK - clicked
    if (clicked == MAXCLICK) {
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

var newGame = function () {
    clickedDom.textContent = MAXCLICK
    clicked = 0
    document.querySelector('#win').style.display = 'none'
    document.querySelector('#lose').style.display = 'none'
    var squares = document.querySelectorAll('li')
    Array.from(squares).forEach(
        function (element) {
            element.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
        }
    );
    // document.querySelector('li').className = 'current'
    setCurrentTwo(document.querySelector('li').style.backgroundColor)
}

for (let color of colors) {
    let button = document.createElement("button")
    button.id = color
    button.style.backgroundColor = color
    button.onclick = handleClick
    buttons.appendChild(button)
}

for (let i = 0; i < 10; i++) {
    let ul = document.createElement('ul')
    for (let j = 0; j < 10; j++) {
        let li = document.createElement('li')
        ul.appendChild(li)
        board.appendChild(ul)
    }
}

newGame()