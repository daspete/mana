const HttpServer = require('manablox-httpserver')
const serverConfig = require('./config/server')

const server = new HttpServer()

server.Initialize(serverConfig)


server.Get('/', async (req, res, next) => {
    res.json({ hello: 'world' })
})

server.Start()