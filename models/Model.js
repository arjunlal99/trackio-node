var config = require('../config')

class Model extends config.database{

    constructor(){
        super()
    }

    /*
        Doesn't require implementation for any other database
         because it can just use its parent class's methods
    */
}

module.exports = Model