const Application = require('./application')
const Koa = require('koa')
const fs = require('fs')
const path = require('path')

const koa = new Application
koa.use((ctx) => {
    //ctx.body = fs.createReadStream(path.resolve(__dirname, './index.js'))
})
koa.listen(4000)
//module.exports = Application
