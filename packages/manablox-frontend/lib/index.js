const HttpServer = require('manablox-httpserver')

class Frontend {
    constructor(){
        this.config = null

        this.httpServer = new HttpServer()
        this.logger = this.httpServer.logger
    }

    Initialize(serverConfig, clientConfig){
        this.httpServer.Initialize(serverConfig)

        if(!clientConfig){
            this.logger.Log('no frontend config defined')
            return
        }

        this.config = clientConfig
    }

    Start(){


        this.httpServer.Start()
    }
}

module.exports = Frontend