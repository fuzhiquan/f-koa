const response = {
    _body: '',
    get body() {
        return this._body
    },
    set body(val) {
        console.log(val)
        this._body = val
    }
}

module.exports = response