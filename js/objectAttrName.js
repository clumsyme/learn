var key = "name"

// 这样会得到 {key: "Tom"}
var obj = {key: "Tom"}

// 这样才会得到 {name: "Tom"}
var obj2 = {[key]: "Tom"}

// 属性访问：
// obj.attr attr为字符串
// obj["attr"] 这种方式可以通过变量访问

// ES6允许定义对象时也用[]把表达式作为变量名