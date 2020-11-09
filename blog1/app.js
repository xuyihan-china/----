//app.js 基础设置的聚集地 系统的基础的功能



//引入文件 处理响应的子路由

const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring')
//用于处理postData 就是客户端传过来的数据
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
}


// http.createServer((req,res)=>{})

const serverHandle = (req, res) => {
    res.setHeader('Content-type', 'application/json')//将server 数据格式改为application/json 

    // const method = req.method
    const url = req.url
    // const path = url.split('?')[0]
    //解析query
    req.query = querystring.parse(url.split('?')[1])
    //处理postData 
    getPostData(req).then(
        postData => {
            req.body = postData
            //以下的路由可以通过postData 来获取数据
            //处理blog路由
            const blogData = handleBlogRouter(req, res)
            if (blogData) {
                res.end(
                    JSON.stringify(blogData) //JSON.stringify 将JavaScript 数值转化为 JSON格式
                )
                return
            }

            const userData = handleUserRouter(req, res)
            if (userData) {
                res.end(
                    JSON.stringify(userData)
                )
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