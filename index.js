var express = require('express')
var app = express()
require('dotenv').config()
app.set('view engine', 'pug')

var home = require('./controller/home')


app.get('/', home.helloTrackio)



//listener
module.exports = app.listen(process.env.PORT || 5000, () => {
    console.log('Trackio-node listening at port ', process.env.PORT)
})