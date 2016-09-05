// <canvas id="canvas" width="500" height="500">Can you see the clock?</canvas>

var canvas = document.getElementById("drawing")
var context = canvas.getContext("2d")
var Pi = Math.PI,
    sin = Math.sin,
    cos = Math.cos
var outerR = 200,
    innerR = 196

// var hLength = 120,
//     mLength = 160,
//     sLength = 180

context.translate(250, 250)
context.strokeStyle = "rgba(0, 0, 255, 0.9)"
context.fillStyle = "rgba(255, 255, 255, 1)"
context.textAlign = "center"
context.textBaseline = "middle"
context.font = "15px serif"
context.shadowOffsetX = 2
context.shadowOffsetY = 2
context.shadowBlur = 5
context.shadowColor = "rgba(0, 0, 255, 0.5)"

function drawClock() {
    context.fillRect(-250, -250, 500, 500)
    var date = new Date(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds(),
        mSecond = date.getMilliseconds(),
        hAngle = 2 * Pi * (3600*hour + 60*minute + second) / 43200,
        mAngle = 2 * Pi * (60*minute + second) / 3600,
        sAngle = 2 * Pi * (second+mSecond/1000) / 60

    context.beginPath()
    
    // 绘制表盘
    context.arc(0, 0, outerR, 0, 2*Pi, false)
    context.moveTo(196, 0)
    context.arc(0, 0, innerR, 0, 2*Pi, false)

    // 绘制刻度
    for (var i=0; i<60; i++){
        if (!(i%5==0)){
            context.moveTo((innerR-10)*sin(2*Pi*i/60), (innerR-10)*cos(2*Pi*i/60))
            context.lineTo(innerR*sin(2*Pi*i/60), innerR*cos(2*Pi*i/60))
        }else{
            context.moveTo((innerR-18)*sin(2*Pi*i/60), (innerR-18)*cos(2*Pi*i/60))
            context.lineTo(innerR*sin(2*Pi*i/60), innerR*cos(2*Pi*i/60))
        }
    }

    // 绘制文字
    context.fillStyle = "rgba(0, 0, 0, 1)"
    for (var i=0; i<60; i+=5){
        if (!(i==0 || i==15 || i===30 || i==45)){
            context.fillText(i/5, (innerR-30)*sin(2*Pi*i/60), -(innerR-30)*cos(2*Pi*i/60))
        }else if(i==0){
            context.font = "30px serif"
            context.fillText(12, (innerR-30)*sin(2*Pi*i/60), -(innerR-30)*cos(2*Pi*i/60), 100)
            context.font = "15px serif"
        }else{
            context.font = "30px serif"
            context.fillText(i/5, (innerR-30)*sin(2*Pi*i/60), -(innerR-30)*cos(2*Pi*i/60), 100)
            context.font = "15px serif"
        }
    }
    context.fillStyle = "rgba(255, 255, 255, 1)"

    // 绘制表针
    context.moveTo(-18*sin(sAngle), 18*cos(sAngle))
    context.lineTo(180*sin(sAngle), -180*cos(sAngle))
    context.moveTo(-12*sin(mAngle), 12*cos(mAngle))
    context.lineTo(160*sin(mAngle), -160*cos(mAngle))
    context.moveTo(-6*sin(hAngle), 6*cos(hAngle))
    context.lineTo(120*sin(hAngle), -120*cos(hAngle))

    context.stroke()
}
setInterval(drawClock, 50)

