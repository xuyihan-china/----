const http = require('http')
http.createServer((req,res)=>{
    const method = req.method
    const url = req.url
    const path = url.path.split('?')[0]
    const query = querystring.parse(url.path.split('?')[1])
})