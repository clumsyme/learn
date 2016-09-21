// Add a button for every zhihu-feed to scroll to the next feed.

var feeds = document.getElementsByClassName('feed-item')
function getElementTop(element){
　　　　var actualTop = element.offsetTop;
　　　　var current = element.offsetParent;
　　　　while (current !== null){
　　　　　　actualTop += current.offsetTop;
　　　　　　current = current.offsetParent;
　　　　}
　　　　return actualTop;
}
function scrollToElement(element){
    // a builtin function can get this without calculate the offsetTop: element.scrollIntoView()
    var eleTopPos = getElementTop(element)
    window.scrollTo(0, eleTopPos)
}
function makeItWork(){
    var nextFeed = feeds[i+1]
    nextButton.onclick = function(){
        scrollToElement(nextFeed)
    }
}
for (var i=0, len=feeds.length; i<len; i++){
    var nextButton = document.createElement("button")
    nextButton.style.cssText = "position:absolute; left:581px; bottom:100px; height:30px; width:50px;"
    nextButton.innerHTML = "next"
    makeItWork()
    // The previous one wont't work cause it's eventhandler function bound to "NextFeed" which will always be the next of last feed
    // at the end of the for loop. Or if we scrollToElement(feed[i+1]) if this function it won't work cause "i" will have a global value.
    // By this way, after every makeItWork() call the nextFeed should be gone but with a reference to event-h function which has a reference 
    // to nextFeed exists, nextFeed target the right feed is bound to the right button.
    feeds[i].appendChild(nextButton)
}