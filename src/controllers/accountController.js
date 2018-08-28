const path = require('path')
/**
 * 最终处理，返回登录页面给浏览器
 */
exports.getLoginPage = (req,res) => {
   res.sendFile(path.join(__dirname,"../statics/views/login.html"))
}

/**
 * 最终处理，返回注册页面给浏览器
 */
exports.getRegisterPage = (req,res) => {
    res.sendFile(path.join(__dirname,"../statics/views/register.html"))
}