// No-Conflict mode
$jq = jQuery.noConflict()

$jq(document).ready(function() {
    console.log('Welcome to jQuery Examples')
})
$jq('h2').attr('title', 'example title')

// use selector
$jq('.hello').html('Hello World')
$jq('ul')
    .find('li')
    .eq(0)
        .html('I was created by chaining')
        .end()
    .last()
    .html('Created by chaining too(see js of example3)')

///////////////////// jQuery Events///////////////////////
// evBasic
$jq('p#clickAlert').click(function(){
    $jq(this).css('color', 'orange')
})
// 上述用法只是下边.on()格式的语法糖，所以推荐用.on()。
$jq('p#onOrClick').on({
    'click': function(){$jq(this).css('color', 'green')},
    'mouseover': function(){$jq(this).css('color', 'orange')}
})

$jq('p#clickOnce').one(
    'click', function(){alert('Only once~')
    $jq(this).on('click', function(){alert('ENOUGH!')})
})
$jq('p#hover').hover(
    function(){$jq(this).css('color', 'orange')},
    function(){$jq(this).css('color', 'green')}
)
$jq('div#red').on('click', function() {
    event.stopPropagation() // 阻止冒泡到.right
    $jq('.right').css('color', 'red')
})
$jq('div#blue').on('click', function() {
    event.stopPropagation()
    $jq('.right').css('color', 'blue')
})
$jq('div#green').on('click', function() {
    event.stopPropagation()
    $jq('.right').css('color', 'green')
})
$jq('.right').on('click', function(event) {
    $jq('.right').css('color', 'black')
    $jq('#cord').html('点击坐标：' + event.pageX + '.' + event.pageY)
})
// Event Delegation
$jq('#delegation').on('mouseover', 'p', function(){
    $jq(this).css('color', 'orange')
})
$jq('#trigger').on('click', function() {
    $jq(this).css('background-color', 'pink')
})
$jq('#clickHide').on('click', function() {
    $jq(this).hide(2000)
})
$jq('#slide').on('click', function() {
    $jq(this).slideUp(1000)
    $jq('#fade').fadeIn(1000)
})
$jq('#fade').on('click', function() {
    $jq(this).fadeOut(1000)
    $jq('#slide').slideDown(1000)
})
$jq('#toggleit').on('click', function() {
    $jq('#toggle').fadeToggle(1000)
})
$jq('#delay').on('click', function() {
    $jq(this).fadeOut(1000).delay(1000).fadeIn(1000)
})
$jq('#animate').animate(
    {
        width: ['+= 100', 'linear'],
        height: ['+= 150', 'swing'],
        left: ['+= 50', 'linear'],
        background: ['lime']
    },3000
)