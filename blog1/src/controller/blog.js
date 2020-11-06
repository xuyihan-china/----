//controller 最关心的是数据 没有 res req 之类的数据
const getList=(author,keyword) =>{
    //返回假数据 格式正确
    return [
        {
            id:1,
            title:'标题1',
            content:'内容A',
            createTime:1546610491112,
            author:'xu'
        },
        {
            id:2,
            title:'标题B',
            content:'内容B',
            createTime:1567778989898,
            author:'yi'
        }
    ]
}
module.exports ={
    getList
}