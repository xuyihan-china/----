//app.js 基础设置的聚集地 系统的基础的功能
process.env.NODE_ENV = 'dev'


//引入文件 处理响应的子路由

const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring')
const {get,set} = require('./src/db/redis')
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
   //解析session redis
   let  userId = req.cookie.userId//判断cookie中是否有userid
   //获取cookie中的userid  
   let needSetCookie= false
   if(!userId){
       needSetCookie=true
       userId =`${Date.now()}+${Math.random()}`
       //初始化set
       set(userId,{})
   }
   req.sessionId = userId;
   get(req.sessionId)
     .then(sessionData => {
       console.log("req.sessionId userId",req.sessionId,userId);
       console.log("sessionData",sessionData);
       if (!sessionData) {
         // 初始化redis 中session的初始值
         set(req.sessionId, {});
         // 设置session
         req.session = {};
       } else {
         req.session = sessionData;
       }
       // console.log("req.session:", req.session);
       return getPostData(req);
     })
     .then(postData => {
       req.body = postData;
       // 处理blog路由
       // const blogData = handleBlogRouter(req, res);
       // if (blogData) {
       //   res.end(JSON.stringify(blogData));
       //   return;
       // }
       const blogResult = handleBlogRouter(req, res);
       if (blogResult) {
         blogResult.then(blogData => {
           // console.log(blogData);
           if (needSetCookie) {
             res.setHeader(
               "Set-Cookie",
               `userid=${userId};path='/';httpOnly;expires=${getCookieExpires()}`
             );
           }
           res.end(JSON.stringify(blogData));
         });
         return;
       }
       // 处理user路由
       // const userData = handleUserRouter(req, res);
       // if (userData) {
       //   res.end(JSON.stringify(userData));
       //   return;
       // }
       const userResult = handleUserRouter(req, res);
 
       if (userResult) {
         userResult.then(userData => {
           // console.log(userData);
           if (needSetCookie) {
             res.setHeader(
               "Set-Cookie",
               `userid=${userId};path='/';httpOnly;expires=${getCookieExpires()}`
             );
           }
           res.end(JSON.stringify(userData));
         });
         return;
       }
       // 未命中路由： 返回404
       res.writeHead(404, {
         "Content-type": "text/plain"
       });
       res.write("404 Not Found\n");
       res.end();
     });
 };
 
 // 用于获取post请求的data

 
 module.exports = serverHandle;

























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