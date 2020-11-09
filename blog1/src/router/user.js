//拆分代码 只管路由的代码
//处理路由就是 浏览器发送一个URL地址 解析请求方法
const {loginCheck} = require('../controller/user')
const { SuccessModel } = require('../model/resModel')
const handleUserRouter=(req,res)=>{  
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]

    if(method==='POST'&&path==='/api/user/login'){
        const {username,password} = req.body
        const result =loginCheck(username,password)
        if(result){
            return new SuccessModel()
        }else{
            return new ErrorModel('失败')
        }
    }
}
module.exports= handleUserRouter



















