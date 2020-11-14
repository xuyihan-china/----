const express = require('express')
const app = express()
app.use((req,res,next)=>{
    console.log('请求开始',req.method,req.url)
    next()
})
//首先执行 低哦一个参数没有的路由 第二执行父路由含有的路由
//通过next的方法往下串联  use内的函数 就是中间件

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
    next()//联系app.use  不执行next 后面的代码都不执行
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