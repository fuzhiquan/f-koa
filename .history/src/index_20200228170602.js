const Application = require('./application')

const koa = new Application
koa.use((ctx) => {
    console.log(ctx.method)
    ctx.body = 'hello'
})
koa.listen(4000)
module.exports = Application
