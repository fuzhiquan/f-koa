const Application = require('./application')

const koa = new Application
koa.use((ctx) => {
    ctx.body = 'hello'
})
koa.listen(4000)
module.exports = Application
