var canvas = document.getElementById("drawing")
var context = canvas.getContext("2d")
var Pi = Math.PI
var sin = Math.sin
var cos = Math.cos

var outerR = 0,
    innerR = 180,
    speed = 24

var hLength = 120,
    mLength = 160,
    sLength = 180

context.translate(250, 250)
context.strokeStyle = "rgba(0, 0, 255, 1)"
context.fillStyle = "rgba(255, 255, 255, 1)"
context.textAlign = "center"
context.textBaseline = "middle"
context.font = "20px times"
// 设置阴影
context.shadowOffsetX = 2
context.shadowOffsetY = 2
context.shadowBlur = 5
context.shadowColor = "rgba(0, 0, 255, 0.5)"

var font = context.font
var bigFont = "40px times"

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
    context.arc(0, 0, outerR, 0, 2*Pi, false)
    context.moveTo(innerR, 0)
    context.arc(0, 0, innerR, 0, 2*Pi, false)
    // context.moveTo(0, 0)

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
            context.font = bigFont
            context.fillText(12, (innerR-30)*sin(2*Pi*i/60), -(innerR-30)*cos(2*Pi*i/60), 100)
            context.font = font
        }else{
            context.font = bigFont
            context.fillText(i/5, (innerR-30)*sin(2*Pi*i/60), -(innerR-30)*cos(2*Pi*i/60), 100)
            context.font = font
        }
    }
    context.fillStyle = "rgba(255, 255, 255, 1)"

    // 绘制表针
    context.moveTo(-(sLength/10)*sin(sAngle), (sLength/10)*cos(sAngle))
    context.lineTo(sLength*sin(sAngle), -sLength*cos(sAngle))
    context.moveTo(-(mLength/10)*sin(mAngle), (mLength/10)*cos(mAngle))
    context.lineTo(mLength*sin(mAngle), -mLength*cos(mAngle))
    context.moveTo(-(hLength/10)*sin(hAngle), (hLength/10)*cos(hAngle))
    context.lineTo(hLength*sin(hAngle), -hLength*cos(hAngle))

    context.stroke()
}

// document.body.appendChild(canvas)
setInterval(drawClock, 1000/speed)


// drawClock()








// var canvas = document.getElementById("drawing")
// var context = canvas.getContext("2d")

// context.strokeStyle = "rgba(0, 0, 255, 0.9)"
// context.fillStyle = "rgba(0, 0, 0, 1)"
// // 设置阴影
// context.shadowOffsetX = 2
// context.shadowOffsetY = 2
// context.shadowBlur = 5
// context.shadowColor = "rgba(0, 0, 255, 0.5)"

// // context.fillRect(100, 100, 300, 300)

// context.beginPath()
// context.translate(250, 250)
// // 绘制表盘
// context.arc(0, 0, 150, 0, 2*Pi, false)
// context.moveTo(140, 0)
// context.arc(0, 0, 140, 0, 2*Pi, false)
// // 绘制表针
// context.moveTo(0,0)
// context.lineTo(10, -118)
// context.moveTo(0, 0)
// context.lineTo(-90, 0)
// context.moveTo(0, 0)
// context.lineTo(120, 50)
// context.moveTo(5, 0)


// // 绘制文字
// context.textAlign = "center"
// context.textBaseline = "middle"
// context.fillText("12", 0, -130)
// context.fillText("3", 130, 0)
// context.fillText("6", 0, 130)
// context.fillText("9", -130, 0)

// // // 绘制图像
// // var scarlett = document.images[1]
// // scarlett.crossOrigin="anonymous"
// // // var pattern = context.createPattern(scarlett, "repeat")
// // // context.fillStyle = pattern 
// // // context.fillRect(0, 0, 500, 500)
// // context.drawImage(scarlett, 0, 0)
// // var imageDate = context.getImageData(0, 0, 500, 500)
// // var data = imageDate.data
// // for (var i=0; i<data.length;i+=4){
// //     var r = data[i],
// //     g = data[i+1],
// //     b = data[i+2]

// //     var average = Math.floor((r+b+g)/3)
// //     var daverage = 0.0*average

// //     var rr = 255-r,//average>128?r+daverage:r-daverage,
// //     rg = 255-g,//average>128?g+daverage:g-daverage,
// //     rb = 255-b//average>128?b+daverage:b-daverage

// //     data[i] = rr
// //     data[i+1] = rg
// //     data[i+2] = rb
// //     // data[i+3] = 0.9
// // }
// // imageDate.data = data
// // context.putImageData(imageDate, 0, 0)

// // // 绘制渐变填充
// // var gradient = context.createLinearGradient(30, 30, 70, 70)
// // gradient.addColorStop(0, "green")
// // gradient.addColorStop(1, "yellow")
// // context.fillStyle = gradient
// // context.fillRect(0, 0, 100, 100)

// // 显示
// context.stroke()



// // var color = true
// // function change(){
// //     var p2 = document.getElementById("p2")
// //     p2.style["color"]=color?"orange":"blue"
// //     color = !color
// //     // p2.style["font-size"] = "50px"
// // }
// // alert(document.getElementById("button1"))
