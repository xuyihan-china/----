//只管路由 命中路由 返回正确的格式
const {getList,getDetail,newBlog,updateBlog,delBlog} = require('../controller/blog')
const {SuccessModel,ErrorModel} = require('./resModel')
const handleBlogRouter=(req,res)=>{
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]
    const id = req.query.id //拿到传入的值
    
    //获取博客列表
    if(method ==='GET'&& path==='/api/blog/list'){
        const author = req.query.author || ''   //author 和 keyword 是通过query 来获取
        const keyword = req.query.keyword || '' //获取query后面的数据 ? author=""&keyword=""
        const listData =getList(author,keyword) //返回一个数组 假装是通过 author 和 keyword 来获取列表
        return new SuccessModel(listData)
    }
    if(method==='GET'&& path ==='/api/blog/detail'){
        const data =getDetail(id) //执行controller中的函数 为了拿到假数据
        return new SuccessModel(data) //返回new xx
    }
    if(method==='POST'&& path ==='/api/blog/new'){
        const blogData = req.body //拿到值
        const data = newBlog(req.body)
        return new SuccessModel(data)
    }
    if(method ==='POST'&& path ==='/api/blog/update'){
        const result = updateBlog(id,req.body)
        if(result){
            return new SuccessModel()
        }else{
            return new ErrorModel('更新失败')
        }
    }
  
    if(method==='POST'&&path ==='/api/blog/delete'){
       const result = delBlog(id)
       if(result){
        return new SuccessModel()
    }else{
        return new ErrorModel('删除失败')
    }
    }
}
module.exports=handleBlogRouter
