var mongoose = require('mongoose')
var Schema = mongoose.Schema
require('dotenv').config({path:'../.env'})

/*
    establish connection to the MongoDB database using URI stored in .env
*/
var conn = mongoose.createConnection(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
conn.once('open', () => {
    console.log('MongoDB Connection Succesful')
    getLogs().then(docs => console.log(docs)).catch(err => console.log(err))
})

//Schema of log to be stored in the database

var logSchema = new Schema({
    timestamp: String,
    os: String,
    browser: String
})

var logModel  = conn.model('log', logSchema)



function addLog(timestamp,os,browser){
    /*
        timestamp => String
        os => String
        browser => String
        function to add a log into the MongoDB database
    */
    var logInstance = new logModel({
        timestamp:timestamp,
        os: os,
        browser: browser})
    return new Promise((resolve,reject) => {
        logInstance.save((err,docs) => {
            if (err){
                return reject(err)
            }
            else{
                resolve(docs)
            }
        })
    })
}



function getLogs(){
    return new Promise((resolve,reject) => {
        logModel.find((err,docs) => {
            if (err){
                return reject(err)
            }
            else{
                resolve(docs)
            }
        })
    })
}


module.exports = {
    getLogs,
    addLog
}