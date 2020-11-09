const http = require('http')
const server = http.createServer((req,res)=>{
    if(req.method ==='POST'){
        console.log('content-type',req.headers['content-type'])
        let postData=''
        req.on('data',chunk=>{
            postData+=chunk.toString()
        })
        //一部份一部分接收数据
        req.on('end',()=>{
            console.log(postData)
            res.end('hello world')
        })
    }
})
server.listen(3000,()=>{
    console.log("successfully completed")
})
/* chunk 一部份 */