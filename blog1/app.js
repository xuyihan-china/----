const handleBlogRouter =require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring')
const serverHandle =(req,res)=>{
    res.setHeader('Content-type','application/json')//将server 数据格式改为application/json 
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]
    //解析query
    req.query =querystring.parse(url.split('?')[0])
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
    res.end()
}
module.exports=serverHandle
