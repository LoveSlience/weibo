const Sequelize = require('sequelize');

const seq = new Sequelize('koa2_weibo_db', 'root', 'liu123456', {
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = seq

//测试连接

// seq.authenticate().then(() => {
//   console.log('ok')
// }).catch(err => {
//   console.log(err)
// })