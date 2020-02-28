const eventEmitter = require('events')
const http = require('http')

class Application extends eventEmitter {
    constructor() {
        super()

    }
    
    use() {

    }

    handleRequest(req, res) {

    }

    listen(...args) {
        http.createServer(this.handleRequest.bind(this))
    }
}

module.exports = Application