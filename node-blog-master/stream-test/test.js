const path = require("path")
const fs = require("fs")

const fileName1 = path.resolve(__dirname,'data.txt')//__dirname 就是当前目录的路径 用于拼接路径
const fileName2 = path.resolve(__dirname,'data-back.txt')

const readSteam = fs.createReadStream(fileName1)
//把file1 的文件读出来
//写入文件2
const writeSteam = fs.createWriteStream(fileName2)

readSteam.pipe(writeSteam)
readSteam.on('data',chunk=>{
    console.log(chunk.toString());
})

readSteam.on('end',()=>{
    console.log("copy done");
})//on data
