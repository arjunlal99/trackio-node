var mongoose = require('mongoose')
var Schema = mongoose.Schema



var conn = mongoose.createConnection(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
conn.once('open', () => {
    console.log('MongoDB Connection Succesful')
})

var adminSchema = new Schema({

})


module.exports = {
    
}