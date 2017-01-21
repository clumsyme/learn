var app = new Vue({
    el: '#game',
    // data: {
    //     colors: ['red', 'green', 'blue', 'purple', 'orange']
    // },
    // mounted: function () {
    //     this.newGame()
    // },
    // methods: {
    //     // 新游戏
    //     newGame: function () {
    //         var squares = document.querySelectorAll('li')
    //         var that = this
    //         squares.forEach(
    //             function (element) {
    //                 element.style.backgroundColor = that.colors[Math.floor(Math.random() * that.colors.length)]
    //             }
    //         );
    //         document.querySelector('li').className = 'current'
    //         this.setCurrent(document.querySelector('.current').style.backgroundColor)
    //     },
    //     // 将current周围color颜色的方块都设置为current类
    //     setCurrent: function(color) {
    //         var squares = document.querySelectorAll('li')
    //         for (let i = 0; i < 9; i++) {
    //             for (let j = 0; j < 9; j++) {
    //                 if (squares[9 * i + j].className == 'current') {
    //                     if (j<8 && squares[9 * i + j + 1].style.backgroundColor == color) {
    //                         squares[9 * i + j + 1].className = 'current'
    //                     } 
    //                     if (i<8 && squares[9 * (i + 1) + j].style.backgroundColor == color) {
    //                         squares[9 * (i + 1) + j].className = 'current'
    //                     }
    //                     if (i>0 && squares[9 * (i - 1) + j].style.backgroundColor == color) {
    //                         squares[9 * (i - 1) + j].className = 'current'
    //                     }
    //                     if (j>0 && squares[9 * i + j - 1].style.backgroundColor == color) {
    //                         squares[9 * i + j - 1].className = 'current'
    //                     } 
    //                 }
    //             }
    //         }
    //     },
    //     // 处理点击
    //     click: function (color) {
    //         this.setCurrent(color)
    //         document.querySelectorAll('.current').forEach(
    //             function (element) {
    //                 element.style.backgroundColor = color
    //             }
    //         );
    //     }
    // }
})