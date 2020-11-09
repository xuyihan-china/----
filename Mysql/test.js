const mysql = require('mysql')
//创建连接对象
const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'ilovemysql',
    port:'3306',
    database:'myblog'
})
con.connect()
const sql = 'select * from users;'

con.query(sql,(err,result)=>{
    if(err){
        console.error(err)
    }
    console.log(result)
})
con.end()