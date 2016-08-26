// In python, 'i = 1' will not be used as a bool type, so the following code is wrong:
if (i=1):
    print(i)
// But in JavaScript, 'i = 1' will be recognised as a bool value true, so 
if (i=1){
    alert(i)
}
// will always alert 1. Even if i is not equal to 1, i will first be given the value of 1,
// and then be code in if will be executed.

var color = "blue"

function changeColor() {
    if (color = "red"){
        alert("red")
    }else{
        alert("blue")
    }
}//will output "red"
// This should be a mess if little attention is paid.