// const { } = require('../utils/env');

let REDIS_CONF = {
  // dev-server port
  port: 6379,
  host: '127.0.0.1'
}

let MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: 'liu123456?',
  port: 3306,
  database: 'koa2_weibo'
}

// if(is)


module.exports = {
  REDIS_CONF,
  MYSQL_CONF
}