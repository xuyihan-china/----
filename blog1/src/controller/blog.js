//controller 最关心的是数据 没有 res req 之类的数据  11
//为什么要将router 和 controller 分开 因为router 关心路由 controller关心数据来源---<给参数返回数据 
const {
    exec
  } = require('../db/mysql')
  const getList = (author, keyword) => {
    // 先返回假数据
    let sql = `select * from blogs where 1=1 `
    if (author) {
      sql += `and author='${author}' `
    }
    if (keyword) {
      sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`
    return exec(sql)
  };
//根据id 获取基本信息 111
const getDetail = (id)=>{
    return [
        {
            id:1,
            title:'标题1',
            content:'内容A',
            createTime:1546610491112,
            author:'xu'
        }
    ]
}
//Post 请求 blogData里面有值
const newBlog = (blogData ={}) =>{
    //如果没有值 就是一个空对象
    //blogData 是一个博客对象 包括 title content 属性
    return {
        id:3 //表示新建博客 ，插入到数据表里的id 每一次递增
    }
       
}
const updateBlog =(id,blogData={})=>{
    return true //更新成功
}

const delBlog =(id)=>{
    return true
}

module.exports ={
    getList,getDetail,newBlog,updateBlog,delBlog
}