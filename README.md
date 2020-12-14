# Nodejs-Koa2
#### nodejs 体系问题：
    nodejs是什么？
        nodejs是基于chrome V8 引擎的JavaScript 的运行环境
        nodejs之前可以在浏览器运行，node出现之后，nodejs可以在nodejs环境下运
  ##### nodejs和前端js的区别？
       都使用 了ES语法
       前端 webAPI
       后端 node API

   #### nodejs如何调试？
       启动nodejs服务 使用inspect
       使用debugger
       chrome中debug chrome://inspect

   #### 当前文件和目录的路径 如何获取？
       path.resolve(__dirname,)
       path.resolve(__pathname,)
       两个全局变量

  #### commonjs 和 es6的区别？
        1.语法不同
        2.commonjs 是动态引入
           if(xxx){const resource = require('../module/app.js')} 可以在执行的时候引入
        3.ES6 Module 是静态引入
           import 必须在开头/最顶层 引入 否则编译不通过 编译的时候引入 不是在执行的时候引入 

  #### path.resolve / path.join的区别？
       都是用于拼接路径 ，join 相对路径 ， resolve绝对路径
       const p1 = path.join('..','src','code1')  = ../src/code1
       const p2 = path.resolve('..','src','code1')  = /user/84824/houduankaifa/src/code1  拼接顺带查找根目录的
#### eventloop  和nodejs 浏览器中的区别？
       时间类型 ： w任务：promise async await process.nextTick()
       h任务 settimeout setInterval ajax setImmediate IO文件 连接mysql soctet连接
       微任务比宏任务更早执行
       callStack 空闲的时候会执行 触发event loop 机制 执行宏任务
       触发eventloop之前 会把所有微任务执行完
       同步代码执行完之后 执行微任务 在进行
       1.执行同步代码
       2.执行微任务
       3.执行宏任务 回到第二步

  #### 异步是什么?

  #### session 如何实现登陆？
      session 为什么要放在redis中：
      进程内存限制
      多进程隔离无法共享

   #### koa2 和express的中间件机制？ 
      代码看来就是一个next函数
      设计上来说 就是一个独立模块
      模块拆分 模块流转 产生功能


   #### async 和 await 的执行顺序的考察？

   #### koa2 的洋葱模型？

   #### 如何逐行读取1G的日志文件？
         stream 流式读取 内存有限 网络带宽有限
   #### nodejs为什么要开启多进程？




