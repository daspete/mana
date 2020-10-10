const httpServer = require('manablox-httpserver')
const serverConfig = require('./config/server')



httpServer.Initialize(serverConfig)


httpServer.Get('/', async (req, res, next) => {
    res.json({ hello: 'world' })
})

httpServer.Start()