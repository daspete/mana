const winston = require('winston')
const { format, createLogger, transports } = winston

class Logger {
    constructor(){
        this.logger = createLogger({
            format: format.combine(
                // format.timestamp(),
                format.simple()
            ),

            transports: [
                new transports.Console({
                    format: format.combine(
                        // format.timestamp(),
                        format.colorize(),
                        format.simple()
                    )
                })
            ]
        })
    }

    Log(...params){
        // console.log('-------------------')
        console.log(...params)
        // console.log('-------------------')
        
        // for(let i = 0; i < params.length; i++){
        //     this.logger.log('info',  this)
        // }
        
    }
}

const logger = new Logger()

module.exports = logger