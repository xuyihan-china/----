const {getList} = require('../controller/blog')
const {SuccessModel,ErrorModel} = require('../model/resModel')
const handleBlogRouter=(req,res)=>{
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]
    if(method ==='GET'&& path==='/api/blog/list'){
        const author = req.query.author || ''
        const keyword = req.query.author || ''
        const listData =getList(author,keyword)
        return new SuccessModel(listData)
    }
    if(method==='POST'&&path ==='/api/blog/detail'){
        return{
            msg:'详情页面'
        }
    }
    if(method ==='POST'&&path ==='/api/blog/update'){
        return {
            msg:'更新博客'
        }
    }
    if(method==='POST'&&path ==='/api/blog/update'){
        return{
            msg:'删除博客'
        }
    }
}
module.exports=handleBlogRouter