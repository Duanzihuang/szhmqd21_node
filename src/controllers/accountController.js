const path = require("path");
const MongoClient = require("mongodb").MongoClient;
// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "szhmqd21";
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
  // Use connect method to connect to the server
  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, client) {
      // 拿到了数据操作的db对象
      const db = client.db(dbName);

      // 拿到集合
      const collection = db.collection("accountInfo");

      // 先根据用户名查询
      collection.findOne({ username: req.body.username }, (err, doc) => {
        if (doc) {
          //用户名存在
          // 关掉和数据库的连接
          client.close();

          // 更改返回的状态
          result.status = 1;
          result.message = "用户名已经存在";

          res.json(result);
        } else {
          //用户名不存在
          //2.如果用户名不存在，则先要把我们的数据插入到数据库中，然后返回注册成功给浏览器
          collection.insertOne(req.body, (err, result2) => {
            // 关掉和数据库的连接
            client.close();
            if (result2 == null) {
              //失败
              result.status = 2;
              result.message = "注册失败";
            }

            res.json(result);
          });
        }
      });
    }
  );
};
