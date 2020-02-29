const Application = require('./application')
const Koa = require('koa')
const fs = require('fs').promises
const path = require('path')
const koaBody = require('koa-body')
const koaBodyParser = require('./koa-bodyparser')
const koaStatic = require('koa-static')

const koa = new Koa
// koa.use(koaBody(
//     {
//         multipart:'multipart',
//         formidable: {
//             uploadDir: path.resolve(__dirname, './upload'),
//             keepExtensions: true
//         }
//     }
//     )) // 解析请求体
koa.use(koaStatic(__dirname))
koa.use(koaBodyParser())

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
                await fs.writeFile(filePath, content)
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