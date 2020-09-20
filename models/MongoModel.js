var BaseModel = require('./BaseModel')
var mongo = require('../database/mongo')

class MongoModel extends BaseModel{

    constructor(){
        super()
    }

    insertData(timestamp,os,browser){
        mongo.addLog(timestamp,os,browser)
            .then((docs) => {
                console.log(docs)
            }).catch((err) => {
                console.log(err)
            })
    }

    getData(){
        mongo.getLogs()
            .then((docs) => {
                console.log(docs)
            }).catch((err) => {
                console.log(err)
            })
    }
}

module.exports = MongoModel