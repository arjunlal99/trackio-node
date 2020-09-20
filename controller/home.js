var Model = require('../models/Model')

function helloTrackio(req,res) {
    res.render('welcome')
}

module.exports = {
    helloTrackio
}