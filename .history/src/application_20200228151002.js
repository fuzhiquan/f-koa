const eventEmitter = require('events')
const http = require('http')

const context = require('./context')
const request = require('./request')
const response = require('./response')

class Application extends eventEmitter {
    constructor() {
        super()

    }

    use(fn) {
        this.fn = fn
    }

    handleRequest(req, res) {

        fn(ctx)
    }

    listen(...args) {
        http.createServer(this.handleRequest.bind(this)).listen(...args)
    }
}

module.exports = Application