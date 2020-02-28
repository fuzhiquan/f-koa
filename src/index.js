const Application = require('./application')
const Koa = require('koa')
const fs = require('fs')
const path = require('path')

const koa = new Application
const sleep = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        },2000)
    })
}
koa.use(async(ctx, next) => {
    console.log(0)
    await next()
    console.log(1)
    ctx.set('Content-Type','text/html')
    ctx.body = '<html><link rel="icon" href="data:;base64,="><body>wolaile</body></html>'
})
koa.use(async(ctx, next) => {
    console.log(2)
    await sleep()
    ctx.body = '<html><link rel="icon" href="data:;base64,="><body>niyashishui</body></html>'
    next()
    console.log(3)
    
})
koa.use((ctx, next) => {
    console.log(4)
    next()
    console.log(5)
})
koa.listen(4000)

