const context = {}

function defineGetter(attr ,key) {
    context.__defineGetter__(key, function() {
        // 注意这个必须是 this，谁调用method，this就指向谁
        return this[attr][key]
    })
}
function defineSetter(attr ,key) {
    context.__defineSetter__(key, function(newVal) {
        return this[attr][key] = newVal
    })
}

defineGetter('request', 'method')
defineGetter('request', 'path')
defineGetter('response', 'body')
defineGetter('response', 'set')
defineGetter('response', 'statusCode')
defineSetter('response', 'body')

module.exports = context