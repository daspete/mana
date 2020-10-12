const HttpServer = require('manablox-httpserver')
const { Nuxt, Builder } = require('nuxt')

class Frontend {
    constructor(){
        this.config = null

        this.httpServer = new HttpServer()
        this.logger = this.httpServer.logger

        this.nuxt = null
        this.builder = null
    }

    async Initialize(serverConfig, clientConfig){
        
        this.httpServer.Initialize(serverConfig)

        if(!clientConfig){
            this.logger.Log('no frontend config defined')
            return
        }


        clientConfig.dev = process.env.NODE_ENV === 'development'

        this.config = clientConfig


        this.nuxt = new Nuxt(this.config)
        this.builder = new Builder(this.nuxt)

        await this.builder.build()
    }

    Start(){
        this.httpServer.Use(this.nuxt.render)

        this.httpServer.Start()
    }
}

module.exports = Frontend