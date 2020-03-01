const Application = require('./koa/application')
const Koa = require('koa')
const fs = require('fs').promises
const { createWriteStream } = require('fs')
const path = require('path')

const Router = require('koa-router')
const koaViews = require('koa-views')
const koaBody = require('koa-body')
const koaStatic = require('koa-static')
const koaBodyParser = require('./koa-middleware/koa-bodyparser')

const koa = new Koa
const router = new Router()
const router1 = new Router()
koa.keys = ['fu']
koa.use(koaStatic('.'))
koa.use(koaBodyParser())
koa.use(koaViews(path.resolve('public'), {
    map: {
        html: 'ejs'
    }
}))

router.get('/login', async(ctx, next) => {
    ctx.cookies.set('name', 'fu', {signed: true})
    await ctx.render('login', {
        user: 'John'
    })
})
router.get('/regist', async(ctx, next) => {
    const name = ctx.cookies.get('name', {signed: true})
    await ctx.render('login', {
        user: name
    })
})
router1.prefix('/hu/sheng')
router1.get('/user', async(ctx, next) => {
    ctx.body = 'hello world'
})
// 装载模版
koa.use(router.routes()).use(router.allowedMethods())
koa.use(router1.routes()).use(router1.allowedMethods())

Buffer.prototype.split = function(sep) {
    const arr = []
    const len = Buffer.from(sep).length
    let current;
    let offset = 0
    while((current = this.indexOf(sep, offset)) !== -1) {
        arr.push(this.slice(offset, current))
        offset = current + len
    }
    arr.push(this.slice(offset))
    return arr
}

koa.use(async(ctx, next) => {
    if(ctx.path === '/login') {
        // 获取请求头上的分割线，用于专门分割formdata数据
        const boundary = `--${ctx.get('Content-Type').split('boundary=')[1]}`
        const dataArr = ctx.request.body.split(boundary).slice(1, -1)
        const fields = {}
        dataArr.forEach(async data => {
            let [info, value] = data.split('\r\n\r\n')
            info = info.toString()
            const key = info.match(/name=\"(.+)\"/)[1]
            if(!info.includes('filename')) {
                const val = value.toString().slice(0, -2)
                fields[key] = val
            }else {
                const filename = info.match(/filename\=\"(.+)\"/)[1]
                const filePath = path.resolve(__dirname, `./upload/${filename}`)
                fields[filename] = filePath
                const content = data.slice(info.length + 4, -2)
                // await fs.writeFile(filePath, content)
                const writeStream = createWriteStream(filePath)
                await writeStream.write(content)
            }
        })
        ctx.request.fields = fields
        ctx.body = 'success'
    }else {
        ctx.body = 'not found'
    }
})

koa.on('error', (err) => {
    console.log(err)
})

koa.listen(3000, () => {
    console.log('server start...')
})