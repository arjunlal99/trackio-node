var BaseModel = require('./BaseModel')
var mongo = require('../database/mongo')

class MongoModel extends BaseModel{

    constructor(){
        super()
    }

    async insertData(timestamp,os,browser,trackio_uuid){
        var docs = await mongo.addLog(timestamp,os,browser,trackio_uuid)
            .then((docs) => {
                return docs
            }).catch((err) => {
                console.log(err)
            })
        return docs
    }

    async getData(){
        var docs = await mongo.getLogs()
            .then((docs) => {
                return docs
            }).catch((err) => {
                console.log(err)
            })
        return docs
    }
}

module.exports = MongoModel