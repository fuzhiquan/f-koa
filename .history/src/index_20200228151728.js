const Application = require('./application')
const koa = new Application
koa.use((ctx) => {
    console.log(ctx)
})
koa.listen(3000)
module.exports = application
