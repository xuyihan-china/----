const redis = require("redis");
const { REDIS_CONF } = require("../conf/db");

// 创建客户端, 不quit() 因为是单例模式
const client = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
client.on("error", err => {
  console.error(err);
});

const set = (key, val) => {
  if (typeof val === "object") {
    // 这边需要val是个string
    val = JSON.stringify(val);
  }
  client.set(key, val, redis.print);
};

const get = key => {//传入的值在reids中 以简直对的形式储存  sessionID = username
   
  const promise = new Promise((resolve, reject) => {
    client.get(key, (err, val) => {
      if (err) {
        reject(err);
        return;
      }
      if (val === void 0) {//如果key是瞎传 的 就返回null
        resolve(null);
        return;
      }
      try {
        resolve(JSON.parse(val)); //格式化 兼容json 转换格式
      } catch (error) {
        resolve(val);
      }
      
    });
  });
  return promise;
};

module.exports = {
  set,
  get
};