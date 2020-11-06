//拆分代码 只管路由的代码
const handleUserRouter=(req,res)=>{
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]

    if(method==='POST'&&path==='/api/user/login'){
        return{
            msg:'登录的接口'
        }
    }
}
module.exports= handleUserRouter