const Frontend = require('manablox-frontend')

const serverConfig = require('./config/server')
const clientConfig = require('./config/client')

const frontend = new Frontend()


const Start = async () => {
    await frontend.Initialize(serverConfig, clientConfig)
    frontend.Start()
}

Start()



