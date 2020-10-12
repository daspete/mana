const Database = require('manablox-database')

class Provider extends Database {
    constructor(collectionName){
        super(collectionName)
    }
}

const provider = new Provider('users')

module.exports = provider