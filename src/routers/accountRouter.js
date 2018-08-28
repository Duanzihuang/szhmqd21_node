//1、导入express
const express = require('express')
const path = require('path')

//2、创建路由对象
const accountRouter = express.Router()

//导入控制器
const accountCTRL = require(path.join(__dirname,"../controllers/accountController.js"))

//3、处理具体的请求
accountRouter.get('/login',accountCTRL.getLoginPage)

//4、导出
module.exports = accountRouter