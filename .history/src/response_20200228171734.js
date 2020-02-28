const response = {
    _body: '',
    get body() {
        return this._body
    },
    set body(val) {
        console.log(val, 110)
        this._body = val
    }
}

module.exports = response