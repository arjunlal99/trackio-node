var mongoose = require('mongoose')
var Schema = mongoose.Schema
require('dotenv').config({path:'../.env'})

/*
    establish connection to the MongoDB database using URI stored in .env
*/
var conn = mongoose.createConnection(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
conn.once('open', () => {
    console.log('MongoDB Logs Connection Succesful')
})

//Schema of log to be stored in the database

var logSchema = new Schema({
    timestamp: String,
    os: String,
    browser: String,
    trackio_uuid: String
})

var logModel  = conn.model('log', logSchema)



function addLog(timestamp,os,browser,trackio_uuid){
    /*
        timestamp => String
        os => String
        browser => String
        function to add a log into the MongoDB database
    */
    var logInstance = new logModel({
        timestamp:timestamp,
        os: os,
        browser: browser,
        trackio_uuid: trackio_uuid
    })
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

/*

    Separate connection to another MongoDB collection for storing user visit count

    Figure out how to make it work for connections to separate databases

*/

var uuid_conn = mognoose.createConnection(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
conn.openUri('open', () => {
    console.log("MongoDB UUID Connection Successful")
})

var uuidSchema = new Schema({
    /*
        Stores the visit count for a particular uuid in an object
    */
    uuid: String,
    visitCount: Number
})

var uuidModel = uuid_conn.model('uuid', uuidSchema)

/*
    Function to check if a particular uuid has visited the site before
*/ 

function hasVisited(uuid){

    return new Promise((resolve,reject) => {
        uuidModel.find({uuid: uuid}, (err, docs) => {
            if (err){
                /*
                    Add error handling later
                */
                console.log(err)
            }
            if (docs === []){
                return reject(false)
            }
            else{
                resolve(docs)
            }
        })
    })

}


/*
    Function to add the visitCount of a particular uuid by one.

    Checks if the uuid is present using hasVisited function.

    If present then add increase its visitCount by one, else create a new entry for the uuid with visitCount 1

*/
function addCount(uuid){
    hasVisited(uuid).then((docs) => {
        /*
            Condition if the uuid has visited before, then update its visitCount by one
        */
        

    }).catch(() => {
        /*
            Condition if the uuid has never visited before, then create a new etry
        */
    })

}

/*
    Function to get the visitCount for a particular uuid
*/
function getCount(uuid){

}


module.exports = {
    getLogs,
    addLog
}