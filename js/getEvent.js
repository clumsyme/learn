// We know how to simulate a event:
//     1.var event = document.createEvent("MouseEvents")
//     2.event.initMouseEvent(a,b,c,d,e,f,g....)
//     3.element.dispatchEvent(event)
// This is so complex, and the most complex parts is creating
// the event object.So we may think we can get the event object
// when the event happens.
// Take the button element as example:
//     the mouseevent is created when a mouse event is happening, 
//     if we want to simulate a click event, we need to get the 
//     click event.We can create a event function:
function getE() {
    e = event
} 
// then:
button.addEventListener("click", getE)
// e will be a global var cause I did't use "var e = event"
// So after button is clicked, a global e is created.
// Then use:
button.dispatchEvent(e)
// to simulate it.

// To get e in this way, the event must be triggered atleast once.
// That's why we must click the button to get e.