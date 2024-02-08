import * as log from 'loglevel'

function getLogger() {
    var logger = log.getLogger('cheap')
    const env = process.env.REACT_APP_ENV
    if (env === 'prod') {
        //logger.setLevel('error')
        logger.setLevel('info')
    } else if (env === 'stage') {
        logger.setLevel('info')
    } else {
        logger.setLevel('trace')
    }
     //   'trace'| 'debug' | 'info' | 'warn' | 'error'
    return logger
}

const logger = getLogger()

export default logger