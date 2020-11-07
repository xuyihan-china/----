//拆分代码 只管路由的代码
//处理路由就是 浏览器发送一个URL地址 解析请求方法
const handleUserRouter=(req,res)=>{  
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]

    if(method==='POST'&&path==='/api/user/login'){
        return{
            msg:'登录的接口' // const userdata = 返回的就是return 里面的值
        }
    }
}
module.exports= handleUserRouter



















