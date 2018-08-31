const path = require("path");
const databasetool = require(path.join(__dirname,"../tools/databasetool.js"))
const captchapng = require("captchapng");
/**
 * 最终处理，返回登录页面给浏览器
 */
exports.getLoginPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../statics/views/login.html"));
};

/**
 * 最终处理，返回注册页面给浏览器
 */
exports.getRegisterPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../statics/views/register.html"));
};

/**
 * 最终处理，把用户名密码保存起来，并且返回结果给浏览器
 */
exports.register = (req, res) => {
  const result = { status: 0, message: "注册成功" };
  
  //1.去数据库中查询，用户民是否已经存在，如果已经存在，则返回用户名存在给浏览器
  databasetool.findOne("accountInfo",{ username: req.body.username },(err,doc)=>{
    if (doc) {
      //用户名存在
      // 更改返回的状态
      result.status = 1;
      result.message = "用户名已经存在";

      res.json(result);
    } else {
      //用户名不存在
      //2.如果用户名不存在，则先要把我们的数据插入到数据库中，然后返回注册成功给浏览器
      databasetool.insertOne("accountInfo",req.body, (err, result2) => {
        if (result2 == null) {
          //失败
          result.status = 2;
          result.message = "注册失败";
        }

        res.json(result);
      });
    }
  })
};

/**
 * 最终处理，返回图片验证码
 */
exports.getVcodeImage = (req, res) => {
  const vcode = parseInt(Math.random() * 9000 + 1000);

  // 把刚刚随机生成的验证码，存储到session中
  req.session.vcode = vcode;

  var p = new captchapng(80, 30, vcode); // width,height,numeric captcha
  p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
  p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

  var img = p.getBase64();
  var imgbase64 = new Buffer(img, "base64");
  res.writeHead(200, {
    "Content-Type": "image/png"
  });
  res.end(imgbase64);
};

/**
 * 最终处理，登录处理
 */
exports.login = (req, res) => {
  const result = { status: 0, message: "登录成功" };

  // 校验验证码
  if (req.body.vcode != req.session.vcode) {
    result.status = 1;
    result.message = "验证码不正确";

    res.json(result);
    return;
  }

  // 去数据库中，使用username & password 去校验
  databasetool.findOne("accountInfo",{ username: req.body.username, password: req.body.password },(err,doc)=>{
    if (doc == null) {
      result.status = 2;
      result.message = "用户名或密码错误";
    }else{
      //登录成功
      req.session.loginedName = req.body.username
    }

    res.json(result);
  })
};

/**
 * 最终处理，登出处理
 */
exports.logout = (req,res) => {
  // 清空session中的loginedname
  req.session.loginedName = null

  // 告诉浏览器跳回到登录页面
  res.send('<script>location.href="/account/login"</script>')
}