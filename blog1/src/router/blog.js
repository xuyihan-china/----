//只管路由 命中路由 返回正确的格式
const {getList} = require('../controller/blog')
const {SuccessModel,ErrorModel} = require('../model/resModel')
const handleBlogRouter=(req,res)=>{
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]

    //获取博客列表
    if(method ==='GET'&& path==='/api/blog/list'){
        const author = req.query.author || ''
        const keyword = req.query.keyword || '' //获取query后面的数据 ? author=""&keyword=""
        const listData =getList(author,keyword) //返回一个数组 假装是通过 author 和 keyword 来获取列表
        return new SuccessModel(listData)
    }
    if(method==='POST'&& path ==='/api/blog/detail'){
        return{
            msg:'详情页面'
        }
    }
    if(method ==='POST'&& path ==='/api/blog/update'){
        return {
            msg:'更新博客'
        }
    }
    if(method==='POST'&& path ==='/api/blog/new'){
        return{
            msg:'新建博客'
        }
    }
    if(method==='POST'&&path ==='/api/blog/delete'){
        return{
            msg:'删除博客'
        }
    }
}
module.exports=handleBlogRouter