//app.js 基础设置的聚集地 系统的基础的功能
process.env.NODE_ENV = 'dev'


//引入文件 处理响应的子路由

const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring')
//用于处理postData 就是客户端传过来的数据

//处理session
const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
    // console.log("d.toGMTstring() is", d.toGMTString());
    return d.toGMTString();
  };


const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {//不是post就忽略
        if (req.method != 'POST') {
            resolve({})
            return
        }

        if (req.headers['Content-type'] !== 'application/json') {//不是json就忽略
            resolve({})
            return
        }
        let postData = ''
        res.on('data', chunk => {
            postData += chunk.toString()
        })
        res.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}


// http.createServer((req,res)=>{})

const serverHandle = (req, res) => {
    res.setHeader('Content-type', 'application/json')//将server 数据格式改为application/json 

    // const method = req.method
    const url = req.url
    // const path = url.split('?')[0]
    //解析query
    req.query = querystring.parse(url.split('?')[1])
    //处理postData const getPostData = req => const getPostData = (req) => {

   //解析cookie
   req.cookie ={}
   const cookieStr = req.headers.cookie || ''
   cookieStr.split(';').forEach(item => {
       if(!item){
           return 
       }
       const arr = item.split('=')
       const key =arr[0].trim()
       const val = arr[1]
       req.cookie[key]=val
       console.log(req.cookie) //
   });
   //解析session
   let  userId = req.cookie.userId//判断cookie中是否有userid
   //获取cookie中的userid  
   let needSetCookie= false
   const SESSION_DATA={}
   if(userId){
    if(!SESSION_DATA[userId]){
        SESSION_DATA[userId]={} //有这个userid 就添加
    }
   }else{
       needSetCookie =true
       userId =`${Date.now()}+${Math.random()}` //没有就随机生成
       SESSION_DATA[userId] ={}
   }
   req.session = SESSION_DATA[userId] // 在session中添加 这个常量 
   //如果两次 session data相同 那么知道是同一个用户

    getPostData(req).then(
        postData => {
            req.body = postData
            //req.body 取到值就是 
            //以下的路由可以通过req.body 来获取数据

            //根据处理返回的路由
            const blogResult = handleBlogRouter(req,res)
            //blogResult 是一个promise 且不为空 那么就then 处理好了请求之后 then
            if(blogResult){
                blogResult.then((blogData) =>{
                    if(needSetCookie){
                        res.setHeader('Set-Cookie',`userid=${userId}; path=/;httpOnly; expires=${getCookieExpires()}`) //只能通过后端来改 不可以通过前端来改
                    }
                    res.end(
                            JSON.stringify(blogData)    
                    )
                })
                return 
            }
            

            //处理blog路由
            // const blogData = handleBlogRouter(req, res)
            // if (blogData) {
            //     res.end(
            //         JSON.stringify(blogData) //JSON.stringify 将JavaScript 数值转化为 JSON格式
            //     )
            //     return
            // }

            // const userData = handleUserRouter(req, res)
            // if (userData) {
            //     res.end(
            //         JSON.stringify(userData)
            //     )
            //     return
            // }
            const userResult = handleUserRouter(req,res)
            if(userResult){
                if(needSetCookie){
                    res.setHeader('Set-Cookie',`userid=${userId}; path=/;httpOnly; expires=${getCookieExpires()}`) //只能通过后端来改 不可以通过前端来改
                }
                userResult.then(userData =>{
                    res.end(JSON.stringify(userData))
                })
                return
            }




            res.writeHead(404, { "Content-type": "text/plain" })//返回纯文本 直接是纯文本404
            res.write("404 not Found\n")
            res.end()
        }
    )

}
module.exports = serverHandle

























// http.createServer((req,res)=>{
//     ///首先设置接受的数据格式
//     res.setHeader('Content-type','text/plain')
//     //获取query的正确方式
//     req.query = querystring.parse(url.split('?')[1])
//     //处理路由的 方法
//     // 
//     const 有数据 = handleUserRouter(req,res)
//     if(有数据){
//         return{
//             消息:'一个值'
//         }
//     }
//     const 有数据 = handleUserRouter(req,res)
//     if(有数据){
//         return{
//             消息:'第二个值'
//         }
//     }
//     if(null){
//         return 404

//     }
// })