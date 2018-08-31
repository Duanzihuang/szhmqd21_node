const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

// 导出
exports.ObjectId = ObjectId;

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "szhmqd21";

/**
 * 抽取连接数据库的方法
 */
const connectDB = (collectionName, callback) => {
  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, client) {
      // 拿到了数据操作的db对象
      const db = client.db(dbName);

      // 拿到集合
      const collection = db.collection(collectionName);

      // 把结果传递出去
      callback(err, client, collection);
    }
  );
};

/**
 * 暴露给控制器用的，查询列表的方法
 * @param {*} collectionName 集合名称
 * @param {*} params 参数对象
 * @param {*} callback 回调函数
 */
exports.findList = (collectionName, params, callback) => {
  connectDB(collectionName, (err, client, collection) => {
    // 根据条件查询列表
    collection.find(params).toArray((err, docs) => {
      client.close();
      // 执行 callback 把结果返回给控制器
      callback(err, docs);
    });
  });
};

/**
 * 暴露给控制器用的，查询一个的方法
 * @param {*} collectionName 集合名称
 * @param {*} params 参数对象
 * @param {*} callback 回调函数
 */
exports.findOne = (collectionName, params, callback) => {
  connectDB(collectionName, (err, client, collection) => {
    // 根据条件查询一个
    collection.findOne(params, (err, doc) => {
      client.close();
      // 执行 callback 把结果返回给控制器
      callback(err, doc);
    });
  });
};

/**
 * 暴露给控制器用的，新增一个的方法
 * @param {*} collectionName 集合名称
 * @param {*} params 参数对象
 * @param {*} callback 回调函数
 */
exports.insertOne = (collectionName, params, callback) => {
  connectDB(collectionName, (err, client, collection) => {
    // 根据条件查询一个
    collection.insertOne(params, (err, result) => {
      client.close();
      // 执行 callback 把结果返回给控制器
      callback(err, result);
    });
  });
};

/**
 * 暴露给控制器用的，修改一个的方法
 * @param {*} collectionName 集合名称
 * @param {*} condition 条件
 * @param {*} params 参数对象
 * @param {*} callback 回调函数
 */
exports.updateOne = (collectionName, condition, params, callback) => {
  connectDB(collectionName, (err, client, collection) => {
    // 根据条件修改一个
    collection.updateOne(condition, { $set: params }, (err, result) => {
      client.close();
      // 执行 callback 把结果返回给控制器
      callback(err, result);
    });
  });
};

/**
 * 暴露给控制器用的，删除一个的方法
 * @param {*} collectionName 集合名称
 * @param {*} params 参数对象
 * @param {*} callback 回调函数
 */
exports.deleteOne = (collectionName,params,callback) => {
  connectDB(collectionName,(err, client, collection) => {
    // 根据条件删除一个
    collection.deleteOne(params,(err,result)=>{
      client.close();
      // 执行 callback 把结果返回给控制器
      callback(err, result);
    })
  })
}
