const xtpl = require('xtpl')
const path = require('path')
const databasetool = require(path.join(__dirname,"../tools/databasetool.js"))
/**
 * 最终处理，返回获取到的学生列表页面
 */
exports.getStudentListPage = (req,res) => {
    const keyword = req.query.keyword || ''
    
    // 调用databasetool.findList 的方法，拿到数据，渲染列表页面，返回给浏览器
    databasetool.findList('studentInfo',{name:{$regex:keyword}},(err,docs)=>{
        xtpl.renderFile(path.join(__dirname,"../statics/views/list.html"),{
            students:docs,
            keyword
        },function(error,content){
            res.send(content)
        });
    })    
}