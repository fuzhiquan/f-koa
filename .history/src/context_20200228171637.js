const context = {}

function defineGetter(attr ,key) {
    context.__defineGetter__(key, function() {
        // 注意这个必须是 this，谁调用method，this就指向谁
        return this[attr][key]
    })
}
function defineSetter(attr ,key) {
    context.__defineSetter__(key, function() {
        console.log(key)
        return this[attr][key]
    })
}

defineGetter('request', 'method')
defineGetter('response', 'body')
defineSetter('response', 'body')

module.exports = context