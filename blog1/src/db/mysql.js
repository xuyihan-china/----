const mysql =require('mysql')
const {MYSQL_CONF} = require('../conf/db')
const con = mysql.createConnection(MYSQL_CONF)
con.connect()
//专门处理sql的函数
function exec(sql){
    const promise = new Promise()
    con.query(sql,(err,result)=>{
        if(err){
            reject(err)
            return 
        }
        resolve(result)
    })
    return promise
}
module.exports(
    exec
)