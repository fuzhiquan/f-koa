const eventEmitter = require('events')
const http = require('http')

const context = require('./context')
const request = require('./request')
const response = require('./response')

class Application extends eventEmitter {
    constructor() {
        super()
        this.context = Object.create(context)
        this.request = Object.create(request)
        this.response = Object.create(response)
    }

    use(fn) {
        this.fn = fn
    }
    _createContext() {
        const ctx = context
        ctx.request = request
        ctx.response = response
        ctx.req = ctx.request.req = req
        ctx.res = ctx.response.res = res

        return ctx
    }
    _handleRequest(req, res) {
        const ctx = this._createContext()

        this.fn(ctx)
    }

    listen(...args) {
        http.createServer(this._handleRequest.bind(this)).listen(...args)
    }
}

module.exports = Application