const express = require('express')
const app = express()
app.use((req,res,next)=>{
    console.log('请求开始',req.method,req.url)
    next()
})
//第一个参数没有写路由 都会访问

app.use((req,res,next)=>{
    req.cookie={
        userId:'abc123'
    }
    next()
})
//第一个参数没有写路由 都会访问

app.use((req,res,next)=>{
    //假设处理postData
    //异步
    setTimeout(()=>{
        req.body={
            a:100,
            b:200
        }
    },1000)
    next()
})
//第一个参数没有写路由 都会访问
app.use('/api',(req,res,next)=>{
    console.log('use /api luyou')
    next()
})

app.get('/api',(req,res,next)=>{
    console.log('get /api luyou')
    next()
})

app.post('/api',(req,res,next)=>{
    console.log('post /api luyou')
})
app.post('/api/getCookie',(req,res,next)=>{
    console.log('post /api/get-cookie luyou')
    res.json({
        errno:0,
        data:req.cookie
    })
})
app.post('/api/get-post-data',(req,res,next)=>{
    console.log('post /sdflkfjs')
    res.json({
        errno:0,
        data:req.body
    })
})

app.use((req,res,next)=>{
    res.json({
        errno:-1,
        msg:'404 not found'
    })
})
app.listen(3000,()=>{
    console.log('run')
})