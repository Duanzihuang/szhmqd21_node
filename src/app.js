//1、导入express
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')

//2、创建应用
const app = express()

app.use(express.static(path.join(__dirname)))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

// Use the session middleware
app.use(session({ secret: 'keyboard cat',resave: true,saveUninitialized:false, cookie: { maxAge: 60000 }}))

//all 是代表支持GET/POST方法，这个all方法要写在集成路由之前
app.all('/*',(req,res,next)=>{
    if(req.url.includes('account')){
        next()
    }else{
        // 判断是否登录，如果登录，放行，如果没有登录直接响应数据回去
        if(req.session.loginedName){
            next()
        }else{ // 没有登录，则响应浏览器一段可以执行的脚本
            res.send(`<script>alert("您还没有登录，请先登录!");location.href="/account/login"</script>`)
        }
    }
})

//3、集成路由
const accountRouter = require(path.join(__dirname,"./routers/accountRouter.js"))
const studentManagerRouter = require(path.join(__dirname,"./routers/studentmanagerRouter.js"))
app.use('/account',accountRouter)
app.use('/studentmanager',studentManagerRouter)

//4、开启Web服务
app.listen(3000,err=>{
    if(err){
        console.log(err)
    }

    console.log("start OK")
})