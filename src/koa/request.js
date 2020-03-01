const url = require('url')

const request = {
    get method() {
        return this.req.method
    },
    get path() {
        return url.parse(this.req.url).pathname
    }
}

module.exports = request