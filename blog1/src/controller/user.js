const {exec} =require('../db/mysql')
const loginCheck =(username,password)=>{
    //先使用假数据
    if(username ==='zhangsan' &&password ==='123'){
        const sql = `select username , realname from users where username =${username} and password =${password} `
        return exec(sql).then(
            rows=>{
                return rows[0] || {}
            }
        )
    }
    else
    {
        return false
    }
}
module.exports={loginCheck}