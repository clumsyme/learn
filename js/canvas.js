var canvas = document.getElementById('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var context = canvas.getContext('2d')

window.onresize = function () {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

class Point {
    constructor(x, y, vx, vy, r, color) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
        this.r = r
        this.color = color
    }
    draw() {
        context.beginPath()
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true)
        context.closePath()
        context.fillStyle = this.color
        context.fill()
    }
    move() {
        this.x += this.vx
        this.y += this.vy
        // if (this.x < 0 || this.x > canvas.width) {
        //     this.vx = -this.vx
        // }
        // if (this.y < 0 || this.y > canvas.height) {
        //     this.vy = -this.vy
        // }
        if (this.x < 0) {
            this.x += canvas.width
        }
        if (this.y < 0) {
            this.y += canvas.height
        }
        if (this.x > canvas.width) {
            this.x = this.x - canvas.width
        }
        if (this.y > canvas.height) {
            this.y = this.y - canvas.height
        }
    }
}

var points = []
for (let i = 0; i < 3; i++) {
    let thisx = Math.random() * canvas.width,
        thisy = Math.random() * canvas.height,
        thisr = Math.random() * 36 + 5,
        thiscolor = 'rgba(' + Math.floor(255 * Math.random()) + ',' + Math.floor(255 * Math.random())
            + ',' + Math.floor(255 * Math.random()) + ',' + 0.12 * Math.random() + ')',
        thisvx = (0.5 - Math.random()) * 1.0,
        thisvy = (0.5 - Math.random()) * 1.0

    points.push(new Point(thisx, thisy, thisvx, thisvy, thisr, thiscolor))
}

function linkpoints() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    for (let point of points) {
        point.draw()
        point.move()
    }
    context.beginPath()
    for (let i = 0; i < points.length; i++) {
        context.moveTo(points[i].x, points[i].y)
        for (let j = i+1; j < points.length; j++) {
            if (Math.abs(points[j].x - points[i].x) < canvas.width / 2 && Math.abs(points[j].y - points[i].y) < canvas.height / 2) {
                context.lineTo(points[j].x, points[j].y)
                context.moveTo(points[i].x, points[i].y)
            }
        }
    }
    context.closePath()
    context.strokeStyle = 'rgba(0, 0, 0, 0.05)'
    context.stroke()
    window.requestAnimationFrame(linkpoints)
}
window.requestAnimationFrame(linkpoints)

window.addEventListener("click", function (e) {
    let thisx = e.clientX,
        thisy = e.clientY,
        thisr = Math.random() * 36 + 5,
        thiscolor = 'rgba(' + Math.floor(255 * Math.random()) + ',' + Math.floor(255 * Math.random())
            + ',' + Math.floor(255 * Math.random()) + ',' + 0.15 * Math.random() + ')',

        thisvx = (0.5 - Math.random()) * 1.2,
        thisvy = (0.5 - Math.random()) * 1.2

    points.push(new Point(thisx, thisy, thisvx, thisvy, thisr, thiscolor))
})