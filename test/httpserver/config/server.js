require('dotenv').config()

module.exports = {
    // server ip and port
    ip: process.env.SERVER_IP || '127.0.0.1',
    port: process.env.SERVER_PORT || 3000,


    // autorouting adds automatically routes recursively from the given path
    routes: {
        disabled: false,
        path: 'routes',
    },

    // security settings (configuration options, see: https://github.com/helmetjs/helmet)
    helmet: {
        disabled: false,
        options: {
            hsts: {
                maxAge: 60 * 60 * 2,
                includeSubDomains: false
            }
        }
    },


    // CORS settings (configuration options, see: https://github.com/expressjs/cors)
    cors: {
        disabled: false,
        options: {
            origin: '*',
            optionsSuccessStatus: 200
        }
    },


    // body parser settings (configuration options, see: https://github.com/expressjs/body-parser)
    bodyParser: {
        disabled: false,
        options: {
            json: {
                limit: '64mb'
            },
            urlencoded: {
                extended: true
            }
        }

    },


    // compression settings (configuration options, see: https://github.com/expressjs/compression)
    compression: {
        disabled: true,
        options: {}
    }
}
