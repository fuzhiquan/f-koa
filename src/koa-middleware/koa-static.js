const path = require('path')
const fs = require('fs').promises
const { createReadStream } = require('fs')

module.exports = (dirname) => {
    return async(ctx, next) => {
        const pathname = ctx.path
        const absPath = path.join(dirname, pathname)
        try{
            const statObj = await fs.stat(absPath)
            if(statObj.isFile()) {
                ctx.body = await createReadStream(absPath)
            }else {
                const dirs = fs.readdir(absPath)
            }
        }catch(e) {
            await next()
        }
    }
}