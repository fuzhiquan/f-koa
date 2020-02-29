const eventEmitter = require('events')
const http = require('http')
const Stream = require('stream')
const context = require('./context')
const request = require('./request')
const response = require('./response')

class Application extends eventEmitter {
    constructor() {
        super()
        this.context = Object.create(context)
        this.request = Object.create(request)
        this.response = Object.create(response)
        this.middlewares = []
    }

    use(fn) {
        this.middlewares.push(fn)
    }

    _createContext(req, res) {
        const ctx = Object.create(this.context)
        ctx.request = Object.create(this.request)
        ctx.response = Object.create(this.response)
        ctx.req = ctx.request.req = req
        ctx.res = ctx.response.res = res

        return ctx
    }
    /**
     * _compose一定要返回一个promise，洋葱模型
     * @param {*} middlewares 
     * @param {*} ctx 
     */
    _compose(middlewares, ctx) {
        let i = -1
        function dispatch(index) {
            if(i == index) return Promise.reject('next() call mutiple times')
            if(index === middlewares.length) return Promise.resolve()
            i = index
            return Promise.resolve(middlewares[index](ctx, () => dispatch(index+1)))
        }
        return dispatch(0)
    }

    _handleRequest(req, res) {
        const ctx = this._createContext(req, res)
        this._compose(this.middlewares, ctx).then(() => {
            const body = ctx.body

            if(body instanceof Stream) {
                body.pipe(res)
            }else if(typeof body === 'object') {
                res.end(JSON.stringify(body))
            }else if(typeof body === 'string' || Buffer.isBuffer(body)) {
                res.end(body)
            }else {
                ctx.statusCode(404)
                res.end('not found')
            }
        })
    }

    listen(...args) {
        http.createServer(this._handleRequest.bind(this)).listen(...args)
    }
}

module.exports = Application