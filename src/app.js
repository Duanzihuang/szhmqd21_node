//1、导入express
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')

//2、创建应用
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// Use the session middleware
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 600000 }}))

//3、集成路由
const accountRouter = require(path.join(__dirname,"./routers/accountRouter.js"))
const studentManagerRouter = require(path.join(__dirname,"./routers/studentmanagerRouter.js"))
app.use('/account',accountRouter)
app.use('/studentmanager',studentManagerRouter)

//4、开启Web服务
app.listen(3000,'127.0.0.1',err=>{
    if(err){
        console.log(err)
    }

    console.log("start OK")
})