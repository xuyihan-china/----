const handleBlogRouter =require('./router/blog')
const handleUserRouter = require('./router/user')
const serverHandle =(req,res)=>{
    res.setHeader('Content-type','application/json')//将server 数据格式改为application/json 
    //处理blog路由
    const blogData =handleBlogRouter(req,res)
    if(blogData){
        res.end(
            JSON.stringify(blogData)
        )
        return
    }

    const userData = handleUserRouter(req,res)
    if(userData){
        res.end(
            JSON.stringify(userData)
        )
        return
    }
    res.writeHead(404,{"Content-type":"text/plain"})
    res.write("404 not Found\n")

}
module.exports=serverHandle
