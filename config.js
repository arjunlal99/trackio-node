var Mongo = require('./models/MongoModel')

var config = {
    /*
        database key is refernce to whichever database's model the user wants to use
        
        database: Mongo/Redis/MySQL or whatever
    */
    database: Mongo
}

module.exports = config