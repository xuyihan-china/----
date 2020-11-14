//controller 最关心的是数据 没有 res req 之类的数据  11
//为什么要将router 和 controller 分开 因为router 关心路由 controller关心数据来源---<给参数返回数据 
const {
    exec
  } = require('../db/mysql')
  const getList = (author, keyword) => {
    // 先返回假数据
    const author = escape(author)
    const keyword = escape(keyword)
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
    const sql =  `select * from blogs where id='${id}'`
    return exec(sql).then(
        rows =>{
            return rows[0]
        }
    )
}
//Post 请求 blogData里面有值
const newBlog = (blogData ={}) =>{
    //如果没有值 就是一个空对象 blog data 包括 title 和content
    //blogData 是一个博客对象 包括 title content 属性
    const title = blogData.title
    const author = blogData.author
    const content = blogData.content
    const createTime = Date.now()
    const sql = `insert into blogs (title,content,createtime,author) values ('${title}','${content}','${createTime}','${author}')`
    return exec(sql).then(insertData =>{
        console.log('insertData is ',insertData)
        return {
            id:insertData.insertId
        }
    })
       
}
const updateBlog =(id,blogData={})=>{
    // id是更新哪个文章，blogData是更新的内容
  const title = blogData.title;
  const content = blogData.content;
  const sql = `update blogs set title='${title}' , content='${content}' where id=${id}`//保证只可以删除自己 的文章
  return exec(sql).then(updateData => {
    // console.log('updateData', updateData);
    if (updateData.affectedRows > 0) {
      return true
    }
    return false;
  })
}

const delBlog =(id,author)=>{
    const sql = `delete from blogs where id='${id}' and author = '${author}'`
    return exec(sql).then(delData =>{
        if(delData.affectedRows>0){
            return true
        }
        return false
    })
    
}

module.exports ={
    getList,getDetail,newBlog,updateBlog,delBlog
}