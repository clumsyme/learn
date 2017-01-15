var express = require('express')
var router = express.Router()

var response = "<h1>Hi there</h1>\
                <a href='https://imliyan.com'>Visit imliyan</a>"

router.get('/', function(req, res) {
    console.log('connected from' +　req.hostname + 'request for' + '/')
    res.render('users', {
        name: req.params.name
    })
})

module.exports = router