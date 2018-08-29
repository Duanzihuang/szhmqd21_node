const xtpl = require('xtpl')
const path = require('path')
/**
 * 最终处理，返回获取到的学生列表页面
 */
exports.getStudentListPage = (req,res) => {
    xtpl.renderFile(path.join(__dirname,"../statics/views/list.html"),{
       
    },function(error,content){
        res.send(content)
    });
}