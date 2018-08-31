const express = require('express')
const path = require('path')
const studentManagerRouter = express.Router()

// 导入studentManagerController
const studentManagerCTRL = require(path.join(__dirname,"../controllers/studentmanagerController.js"))

// 处理具体请求
// 获取学生列表页面
studentManagerRouter.get('/list',studentManagerCTRL.getStudentListPage)

// 获取新增页面
studentManagerRouter.get('/add',studentManagerCTRL.getAddStudentPage)

// 完成新增操作
studentManagerRouter.post('/add',studentManagerCTRL.addStudent)

// 完成新增操作
studentManagerRouter.get('/edit/:studentId',studentManagerCTRL.getEditStudentPage)

// 完成修改操作
studentManagerRouter.post('/edit/:studentId',studentManagerCTRL.editStudent)

module.exports = studentManagerRouter