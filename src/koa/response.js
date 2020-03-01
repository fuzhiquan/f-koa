const response = {
    _body: undefined,
    get body() {
        return this._body
    },
    set body(val) {
        this._body = val
    },
    set(key, val) {
        this.res.setHeader(key, val)
    },
    statusCode(code) {
        this.res.statusCode = code
    }
}

module.exports = response