const path = require('path')
const Logger = require('manablox-logger')

const MongoDB = require('./mongodb')

class Database {
    constructor(collection, config = null){
        this.collection = collection

        if(!config){
            config = require(path.join(process.cwd(), 'config', 'database'))
        }
        
        this.database = new MongoDB(config)
        
        try {
            this.database.Connect()
        }catch(err){ Logger.Log('DB connection error', err) }
    }

    async Count(params){
        return this.database.Count({ collection: this.collection, ...params })
    }

    async Find(params){
        return this.database.Find({ collection: this.collection, ...params })
    }

    async FindById(...params){
        return this.database.FindById(this.collection, ...params)
    }

    async FindOne(params){
        return this.database.FindOne({ collection: this.collection, ...params })
    }

    async Create(params){
        params.createdAt = new Date()
        params.deleted = false
        return this.database.Create({ collection: this.collection, data: params })
    }

    async UpdateById(params){
        params.data.updatedAt = new Date()
        return this.database.UpdateById(this.collection, params.id, params.data)
    }

    async Update(params){
        params.data.updatedAt = new Date()
        return this.database.Update({ collection: this.collection, ...params })
    }

    async Delete(...params){
        params.data = {
            deletedAt: new Date(),
            deleted: true
        }
        return this.database.Update({ collection: this.collection, ...params })
    }

    async DeleteById(id, hardDelete = false){
        if(hardDelete){
            let item = await this.database.FindById(this.collection, id)
            await this.database.DeleteById(this.collection, id)
            return item
        }


        const updateData = {
            deletedAt: new Date(),
            deleted: true
        }

        return this.database.UpdateById(this.collection, id, updateData)
    }
}

module.exports = Database