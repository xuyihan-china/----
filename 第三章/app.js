const http = require('http')
http.createServer((req,res)=>{
    //对 req/query 进行解析 
    const method = req.method
    const url = req.url
    const path = url.path.split('?')[0]
    const query = querystring.parse(url.path.split('?')[1])
//设置回复类型 回复头 为JSON格式 application/json
    res.setHeader('Content-type','application/json')
    const resData ={
        method,
        url,
        path,
        query
    }
    if(method==='GET'){
        res.end(
            JSON.stringify(resData)
        )
    }
    if(method==='POST'){
        let postData = ''
        req.on('data',chunk=>{
            postData+=chunk.toString()
        })
        req.on('end',()=>{
            res.end(resData)
        })
    }
})
server.listen(8000)
console.log('OK')