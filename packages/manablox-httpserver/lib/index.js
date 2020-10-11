const fs = require('fs')
const http = require('http')
const path = require('path')
const find = require('find')
const cors = require('cors')
const helmet = require('helmet')
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')

const Logger = require('manablox-logger')

class HttpServer {
    constructor(){
        this.config = null

        this.server = null
        this.app = null
        this.logger = Logger
    }

    Initialize(config){
        this.config = config
        
        if(!this.config){
            this.logger.Log('no server config defined')
            return
        }

        this.app = express()
        if(!this.config.helmet.disabled) this.app.use(helmet(this.config.helmet.options))
        if(!this.config.cors.disabled) this.app.use(cors(this.config.cors.options))
        if(!this.config.compression.disabled) this.app.use(compression(this.config.compression.options))
        if(!this.config.bodyParser.disabled) this.app.use(bodyParser.json(this.config.bodyParser.options.json))
        if(!this.config.bodyParser.disabled) this.app.use(bodyParser.urlencoded(this.config.bodyParser.options.urlencoded))

        if(!this.config.routes.disabled && this.config.routes.path){
            this.CreateRoutes()
        }
    }

    Start(){
        this.server = http.createServer(this.app)
        this.server.listen(this.config.port, this.config.ip, () => {
            this.logger.Log(`Server started at ${ this.config.ip }:${ this.config.port }`)
        })
    }

    CreateRoutes(){
        let routePath = path.join(process.cwd(), this.config.routes.path)

        if(!fs.existsSync(routePath)){
            this.logger.Log('routes path not found')
            return
        }

        let routeFiles = find.fileSync(/.js/, routePath)

        for(let i = 0; i < routeFiles.length; i++){
            let route = require(routeFiles[i])

            let method = route.method.toLowerCase()

            const url = routeFiles[i].replace(routePath, '')
                .replace('/index.js', '')
                .replace('.js', '')
                .split('/')
                .map(urlPart => urlPart.startsWith('_') ? urlPart.replace('_', ':') : urlPart)
                .join('/')

            this.app[method](url == '' ? '/' : url, route.resolver)
        }
    }

    Use(...params){ this.app.use(...params) }
    All(...params){ this.app.all(...params) }
    Get(...params){ this.app.get(...params) }
    Put(...params){ this.app.put(...params) }
    Post(...params){ this.app.post(...params) }
    Delete(...params){ this.app.delete(...params) }
    Options(...params){ this.app.options(...params) }
    
}

module.exports = HttpServer

