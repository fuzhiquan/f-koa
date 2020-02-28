const koa = require('./application')

koa.use((ctx) => {
    console.log(ctx)
})
koa.listen(3000)
module.exports = application
