// <form method="post", name="testform">
//     <input type="text" maxlength="3" id="t1" size="5"> -
//     <input type="text" maxlength="4" id="t2" size="7"> -
//     <input type="text" maxlength="4" id="t3" size="7">
// </form>
// To make the above input elements auto focus next element when get the max length.
// Here's the function:
function focusNext(){
    var target = event.currentTarget
    var form = target.form

    if (target.value.length == target.maxLength){
        for (var i=0; i<form.elements.length-1; i++){
            if (form.elements[i] == target ){
                form.elements[i+1].focus()
            }
        }
    }
}
var inputs = document.getElementsByTagName("input")
inputs[0].addEventListener("keyup", focusNext)
inputs[1].addEventListener("keyup", focusNext)
inputs[2].addEventListener("keyup", focusNext)