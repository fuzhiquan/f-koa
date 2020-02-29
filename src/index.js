const Application = require('./application')
const Koa = require('koa')
const fs = require('fs')
const path = require('path')
const bodyparser = require('./koa-bodyparser')

const koa = new Koa
koa.use(bodyparser())
koa.use(async(ctx, next) => {
    if(ctx.path === '/index.html') {
        const absPath = path.join(__dirname, ctx.path)

        ctx.set('Content-Type', 'text/html;charset=utf-8')
        ctx.body = fs.createReadStream(absPath)
    }else{
        await next()
    }
})

koa.use(async(ctx, next) => {
    if(ctx.path === '/login') {
        ctx.body = ctx.request.body
    }else {
        ctx.body = 'not found'
    }
})
koa.listen(3000, () => {
    console.log('server start...')
})