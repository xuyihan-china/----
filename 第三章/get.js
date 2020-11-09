
const http = require('http')
const queryString = require('querystring')
const server = http.createServer((req,res)=>{
    console.log(req.method)
    const url = req.url
    req.query = queryString.parse(url.split('?')[1])
    res.end(JSON.stringify(req.query))
    res.end(JSON.stringify(url))
})
server.listen(8000,()=>{
    console.log('sucessfully created')
})