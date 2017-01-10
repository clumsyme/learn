var fs = require('fs')

fs.readFile('/big.txt', function(err, file) {
    console.log('big done!')
})
fs.readFile('/io.txt', function(err, file) {
    console.log('well done!')
})

console.log('let\'s do it')
