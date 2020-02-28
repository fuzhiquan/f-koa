const context = {}
// 给context定义method属性
context.__defineGetter__('method', function() {
    //  注意 这个必须是 this，谁调用method，this就指向谁
    return this.request.method
})
module.exports = context