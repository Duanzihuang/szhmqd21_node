const xtpl = require('xtpl')
const path = require('path')
const MongoClient = require('mongodb').MongoClient
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'szhmqd21';
/**
 * 最终处理，返回获取到的学生列表页面
 */
exports.getStudentListPage = (req,res) => {
    const keyword = req.query.keyword || ''
    // Use connect method to connect to the server
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
        // 拿到db对象
        const db = client.db(dbName);

        // 拿到集合
        const collection = db.collection('studentInfo');

        // 查询
        collection.find({name:{$regex:keyword}}).toArray((err,docs)=>{
            // 关闭与数据库的连接 
            client.close();
            /**
             * 参数1：要渲染的页面的路径，最终找到list.html是根据绝对路径去找
             * 参数2：渲染页面所需要的数据
             * 参数3：渲染完毕之后的回调
             */
            xtpl.renderFile(path.join(__dirname,"../statics/views/list.html"),{
                students:docs,
                keyword
            },function(error,content){
                res.send(content)
            });
        })
    });
}