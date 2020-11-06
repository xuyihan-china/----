const http = require('http')
//完全是createserver 的逻辑 
const PORT = 3000
const serverHandle = require('../app.js')
const server = http.createServer(serverHandle)
server.listen(PORT,()=>{
    console.log(" created localhost "+PORT)
})