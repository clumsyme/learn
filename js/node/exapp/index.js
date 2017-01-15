var path = require('path')
var express = require('express')
var app = express()

var indexRouter = require('./route/index')
var usersRouter = require('./route/users')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use('/', indexRouter)
app.use('/users', usersRouter)

console.log('Serverstart at 25000')
app.listen(25000)