//拆分代码 只管路由的代码
//处理路由就是 浏览器发送一个URL地址 解析请求方法
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')


//设置cookie 过期时间 expires
const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
    // console.log("d.toGMTstring() is", d.toGMTString());
    return d.toGMTString();
};



const handleUserRouter = (req, res) => {
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]
    let username2 = ''
    if (method === 'GET' && path === '/api/user/login') {
        //const {username,password} = req.body
        const { username, password } = req.query
        const result = login(username, password)
        return result.then(data => {
            req.session.username = data.username //先赋值在判断
            req.session.realname = data.realname
            //如果拿到了session值 
            if (req.session.username) {
                username2 =req.session.username
                //操作cookie  后端操作cookie 
                res.setHeader('Set-Cookie', `username=${data.username}; path=/;httpOnly; expires=${getCookieExpires()}`) //只能通过后端来改 不可以通过前端来改
                return new SuccessModel({a:'成功了',session:req.session})
            }
            return new ErrorModel('失败')
        })
    }

    if (method === 'GET' && path === '/api/user/login-test') {
        //console.log('111')
        if (1) {
            return Promise.resolve(new SuccessModel(
                {
                    session: req.session,
                    a: '成功了'
                }
            ))
        }
        return Promise.resolve(new ErrorModel('没有登陆'))

    }
}
module.exports = handleUserRouter



















