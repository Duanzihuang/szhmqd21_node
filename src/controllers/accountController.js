const path = require('path')
/**
 * 最终处理，返回登录页面给浏览器
 */
exports.getLoginPage = (req,res) => {
   res.sendFile(path.join(__dirname,"../statics/views/login.html"))
}