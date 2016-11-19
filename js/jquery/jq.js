// No-Conflict mode
$jq = jQuery.noConflict()

$jq(document).ready(function() {
    console.log('Welcome to jQuery Examples')
})
$jq('h2').attr('title', 'example title')

// example3
$jq('.hello').html('Hello World')
$jq('ul')
    .find('li')
    .eq(0)
        .html('I was created by chaining')
        .end()
    .last()
    .html('Created by chaining too(see js of example3)')